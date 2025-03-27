import { 
  createDirectus,
  staticToken,
  rest,
  readUser,
  readMe,
  updateUser,
  readItems,
  readItem,
  createItem,
  updateItem,
  deleteItem,
  withToken,
  registerUser,
  registerUserVerify,
  passwordRequest,
  passwordReset,
  readUsers,
} from '@directus/sdk';
import { parse as parseCookie } from 'cookie';
import { CourseDef, TopicSource } from 'kodim-cms/esm/content/courses-division';

export interface User {
  id: string;
  email: string;
  name: string | null;
  accessRules: string[];
  groups: {
    id: string;
    name: string;
  }[];
  avatarUrl: string | null;
};

type GroupInvite = 'open' | 'closed' | 'none';

export interface Group {
  id: string;
  name: string;
  invite: GroupInvite;
  accessRules: string[];
};

export const client = createDirectus('http://directus:8055')
  .with(staticToken(process.env.DIRECTUS_API_TOKEN ?? ''))
  .with(rest());

export const refreshSession = async (sessionToken: string): Promise<SessionCookie | null> => {
  const response = await fetch(`http://directus:8055/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `session_token=${sessionToken}`,
    },
    body: JSON.stringify({ mode: 'session' }),
  });

  if (!response.ok) {
    return null;
  }

  const cookieHeader = response.headers.get('set-cookie');
  if (cookieHeader === null) {
    return null;
  }

  const parsed = parseCookie(cookieHeader);
  return {
    name: 'session_token',
    domain: '.kodim.cz',
    value: parsed.session_token!,
    maxAge: Number(parsed['Max-Age']),
    path: parsed.Path!,
    sameSite: parsed.SameSite === 'None' ? 'none' : parsed.SameSite === 'Lax',
  }
}

export interface SessionCookie {
  name: string;
  domain: string;
  value: string;
  maxAge: number;
  path: string;
  sameSite: boolean | 'lax' | 'strict' | 'none';
}

export const login = async (email: string, password: string): Promise<SessionCookie | null> => {
  const response = await fetch(`http://directus:8055/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, mode: 'session' }),
  });

  if (!response.ok) {
    return null;
  }

  const cookieHeader = response.headers.get('set-cookie');
  if (cookieHeader === null) {
    return null;
  }

  const parsed = parseCookie(cookieHeader);
  return {
    name: 'session_token',
    domain: '.kodim.cz',
    value: parsed.session_token!,
    maxAge: Number(parsed['Max-Age']),
    path: parsed.Path!,
    sameSite: parsed.SameSite === 'None' ? 'none' : parsed.SameSite === 'Lax',
  }
}

export const getCurrentUser = async (sessionToken: string): Promise<User | null> => {
  try {
    const client = createDirectus('http://directus:8055').with(rest())
    const apiUser = await client.request(
      withToken(
        sessionToken,
        readMe({
          fields: [
            'id',
            'email',
            'first_name',
            'external_identifier',
            'fullName',
            'avatar',
            'groups.*.*'
          ],
        }),
      ));

    return userFromApi(apiUser)
  } catch (e) {
    console.error('getCurrentUser error', e);
    console.log('sessionToken', sessionToken);
    return null;
  }
}

export type RegistrationResult = 'success' | 'user-exists' | 'error';

export const registerNewUser = async (
  email: string, password: string, sendNewsletter: boolean,
): Promise<RegistrationResult> => {
  try {
    const apiUsers = await client.request(
      readUsers(
        {
          filter: {
            email: {
              _eq: email,
            }
          }
        }
      ),
    );
    
    if (apiUsers.length > 0) {
      return 'user-exists';
    }

    await client.request(
      registerUser(email, password),
    );

    const newApiUser = await client.request(
      readUsers(
        {
          filter: {
            email: {
              _eq: email,
            }
          }
        }
      ),
    );

    if (newApiUser.length === 0) {
      return 'error';
    }

    await client.request(updateUser(newApiUser[0].id, {
      // @ts-expect-error
      sendNewsletter,
    }));

    return 'success';
  } catch (e) {
    console.error('registerNewUser error', e);
    return 'error';
  }
}

export const verifyUserEmail = async (token: string): Promise<boolean> => {
  try {
    await client.request(registerUserVerify(token));

    return true;
  } catch (e) {
    console.error('verifyUserEmail error', e);
    return false;
  }
}

export const requestResetPassword = async (email: string): Promise<boolean> => {
  try {
    await client.request(passwordRequest(email));

    return true;
  } catch (e) {
    console.error('reqeustResetPassword error', e);
    return false;
  }
}

export const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
  try {
    await client.request(passwordReset(token, newPassword));

    return true;
  } catch (e) {
    console.error('resetPassword error', e);
    return false;
  }
}

export const userFromApi = (apiUser: Record<string, any>): User => {
  const userGroups = apiUser.groups ?? [];
  const accessRules = userGroups.reduce((acc: string[], group: any) => {
    const ruleObjects = group.Groups_id?.accessRules ?? null;
    if (ruleObjects === null) {
      return acc;
    }

    return [
      ...acc,
      ...ruleObjects.map((ruleObject: any) => ruleObject.rule),
    ];
  }, []);

  if (typeof apiUser.email !== 'string') {
    console.warn('USER WITHOUT EMAIL', apiUser);
    apiUser.email = '';
  }

  return {
    id: apiUser.id,
    email: apiUser.email,
    name: apiUser.fullName
      ?? apiUser.first_name
      ?? apiUser.external_identifier
      ?? apiUser.email.slice(0, apiUser.email.indexOf('@'))
      ?? 'Neznámý uživatel',
    avatarUrl: apiUser.avatar === null
      ? null
      : `/assets/${apiUser.avatar}`,
    accessRules,
    groups: userGroups
      .filter((group: any) => group.Groups_id !== null)
      .map((group: any) => ({
        id: group.Groups_id.id,
        name: group.Groups_id.name,
      })),
  };
}

export const fetchUser = async (id: string): Promise<User | null> => {
  try {
    const apiUser = await client.request(
      readUser(
        id,
        { 
          fields: ['id', 'email', 'first_name', 'avatar', 'groups.*.*'],
        }
      ),
    );
    return userFromApi(apiUser);
  } catch (error) {
    console.error('fetchUser error', error);
    return null;
  }
};

export const fetchTopics = async (): Promise<TopicSource[]> => {
  const result = await client.request(
    readItems(
      'Topics',
      {
        fields: [
          'id',
          'title',
          'lead',
          'courses.id',
          'courses.organization',
          'courses.draft',
          'courses.contentFolder',
          'courses.repoUrl',
          'courses.repoFolder',
          'courses.topic.id',
        ],
        sort: 'order',
      },
    ),
  );

  return result.map((topic: Record<string, any>): TopicSource => ({
    name: topic.id,
    title: topic.title,
    lead: topic.lead,
    courses: topic.courses.map((course: Record<string, any>): CourseDef => ({
      name: course.id,
      folder: `/content${course.contentFolder}`,
      topic: course.topic.id,
      organization: course.organization,
      repo: course.repoUrl === null ? null : {
        url: course.repoUrl,
        folder: course.repoFolder === null
          ? `/content${course.contentFolder}`
          : `/content${course.repoFolder}`,
      },
      draft: course.draft,
    })),
  }));
};

const groupFromApi = (group: Record<string, any>): Group => ({
  id: group.id,
  name: group.name,
  invite: group.invite,
  accessRules: group.accessRules?.map((ruleObject: any) => ruleObject.rule) ?? [],
});

export const fetchGroup = async (id: string): Promise<Group | null> => {
  try {
    const result = await client.request(
      readItem('Groups', id, { fields: ['id', 'name', 'invite', 'accessRules.*.*'] }),
    );
    
    return groupFromApi(result);
  } catch {
    return null;
  }
};

export const addToGroup = async (userId: string, groupId: string): Promise<void> => {
  client.request(createItem('Groups_directus_users', {
    Groups_id: groupId,
    directus_users_id: userId,
  }));
}

export const addSubscription = async (email: string, topic: string | null): Promise<void> => {
  let result: Record<string, any> | null = null;
  try {
    result = await client.request(
      readItem('Subscriptions', email),
    );
  } catch {
    result = null;
  }
  
  if (result === null) {
    await client.request(createItem('Subscriptions', {
      email,
      topics: topic,
    }));
    return;
  }

  const newTopics = result.topics === null
    ? topic
    : result.topics + (topic === null ? '' : ` | ${topic}`);

  await client.request(updateItem('Subscriptions', email, {
    topics: newTopics,
  }));
}

export const deleteSubscription = async (email: string): Promise<void> => {
  client.request(deleteItem('Subscriptions', email));
};

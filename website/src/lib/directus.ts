import { 
  createDirectus,
  staticToken,
  rest,
  readMe,
  readUser,
  readItems,
  readItem,
} from '@directus/sdk';
import { CourseDef } from 'kodim-cms/esm/content/topic';

export interface User {
  id: string;
  email: string;
  firstName: string;
  accessRules: string[];
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

export const fetchCurrentUserId = async () => {
  const result = await client.request(
    readMe({ fields: ['id'] }),
  );
  return result.id;
};

export const fetchUser = async (id: string): Promise<User> => {
  const apiUser = await client.request(
    readUser(
      id,
      { 
        fields: ['id', 'email', 'first_name', 'Groups.*.*']
      },
    ),
  );

  const accessRules = apiUser.Groups.reduce((acc: string[], group: any) => {
    const ruleObjects = group.Groups_id.AccessRules;
    if (ruleObjects === null) {
      return acc;
    }

    return [
      ...acc,
      ...ruleObjects.map((ruleObject: any) => ruleObject.Rule),
    ];
  }, []);

  return {
    id: apiUser.id,
    email: apiUser.email,
    firstName: apiUser.first_name,
    accessRules,
  };
};

export const fetchCourses = async (): Promise<CourseDef[]> => {
  const result = await client.request(
    readItems(
      'Courses',
      {
        fields: ['id', 'contentFolder', 'topic'],
      },
    ),
  );

  return result.map((course: Record<string, any>) => ({
    folder: `/content${course.contentFolder}`,
    topic: course.topic,
    repoFolder: '',
    repoUrl: '',
  }));
};

const groupFromApi = (group: Record<string, any>): Group => ({
  id: group.id,
  name: group.Name,
  invite: group.invite,
  accessRules: group.AccessRules?.map((ruleObject: any) => ruleObject.Rule) ?? [],
});

export const fetchGroup = async (id: string): Promise<Group | null> => {
  try {
    const result = await client.request(
      readItem('Groups', id, { fields: ['id', 'Name', 'invite', 'AccessRules.*.*'] }),
    );
    
    return groupFromApi(result);
  } catch {
    return null;
  }
};

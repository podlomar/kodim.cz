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
        fields: ['id', 'email', 'first_name', 'groups.*.*']
      },
    ),
  );

  const accessRules = apiUser.groups.reduce((acc: string[], group: any) => {
    const ruleObjects = group.Groups_id.accessRules;
    
    if (ruleObjects === null) {
      return acc;
    }

    return [
      ...acc,
      ...ruleObjects.map((ruleObject: any) => ruleObject.rule),
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
        fields: [
          'id',
          'topic',
          'organization',
          'contentFolder',
          'repoUrl',
          'repoFolder',
        ],
      },
    ),
  );

  return result.map((course: Record<string, any>) => ({
    name: course.id,
    folder: `/content${course.contentFolder}`,
    topic: course.topic,
    organization: course.organization,
    repoFolder: course.repoFolder,
    repoUrl: course.repoUrl,
  }));
};

const groupFromApi = (group: Record<string, any>): Group => ({
  id: group.id,
  name: group.Name,
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

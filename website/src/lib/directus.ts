import { 
  createDirectus,
  staticToken,
  rest,
  readMe,
  readUser,
  readItems,
  readItem,
} from '@directus/sdk';
import { CourseDef, TopicSource } from 'kodim-cms/esm/content/topic';

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
          'courses.contentFolder',
          'courses.repoUrl',
          'courses.repoFolder',
          'courses.topic.id'
        ],
        sort: 'order',
      },
    ),
  );

  return result.map((topic: Record<string, any>): TopicSource => ({
    name: topic.id,
    title: topic.title,
    heading: topic.title,
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
    })),
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

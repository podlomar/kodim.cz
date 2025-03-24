import { defineHook } from '@directus/extensions-sdk';

interface EmailPayload {
  to: string;
  subject: string;
  template: {
    name: string;
    data: Record<string, any>;
  }
}

interface UserPayload {
  provider: string;
  first_name: string;
  external_identifier: string;
  avatar: string;
  email: string;
}

export default defineHook(({ filter }) => {
	filter<EmailPayload>('email.send', async (payload: EmailPayload): Promise<EmailPayload> => {
    console.log('EMAIL PAYLOAD', payload);
    const template = payload.template;
    const url = new URL(template.data.url);
  	switch (template.name) {
      case 'user-registration':
        payload.subject = 'Ověření e-mailové adresy';
        payload.template.data = {
          url: `${process.env.PROJECT_URL}/aktivace?token=${url.searchParams.get('token')}`,
        };
        break;
      case 'password-reset':
        payload.subject = 'Obnova hesla';
        payload.template.data = {
          url: `${process.env.PROJECT_URL}/obnova-hesla?token=${url.searchParams.get('token')}`,
        };
        break;
    };
  
  	return payload;
	});

  filter<UserPayload>('auth.create', async (payload: UserPayload, meta) => {
    if (payload.provider !== 'github') {
      return payload;
    }

    if (payload.first_name === null || payload.first_name === undefined) {
      payload.first_name = payload.external_identifier;
    }

    const avatarResponse = await fetch('http://directus:8055/files/import', {
      method: 'POST',
      body: JSON.stringify({
        url: meta.providerPayload.userInfo.avatar_url,
        data: {
          folder: process.env.AVATARS_FOLDER_ID,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    });
    const avatar = await avatarResponse.json();
    console.log('AVATAR', avatar);
    payload.avatar = avatar.data.id;

    if (payload.email === null || payload.email === undefined) {
      const emailsResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          authorization: `Bearer ${meta.providerPayload.accessToken}`,
        },
      });
      const emailsData = await emailsResponse.json();
      const email = emailsData.find((email: any) => email.primary)?.email;
      payload.email = email;
    }

    return payload;
  });
});

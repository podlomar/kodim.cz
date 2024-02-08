export default ({ filter }) => {
  filter('auth.create', async (payload, meta) => {
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
          folder: '941c47ca-d818-4f30-9659-9106fcc716ca',
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 4rI4X0JsLRCazvXwbWqFwL-QOy5tTzQU`,
      },
    });
    const avatar = await avatarResponse.json();
    payload.avatar = avatar.data.id;

    if (payload.email === null || payload.email === undefined) {
      const emailsResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          authorization: `Bearer ${meta.providerPayload.accessToken}`,
        },
      });
      const emailsData = await emailsResponse.json();
      const email = emailsData.find((email) => email.primary)?.email;
      payload.email = email;
    }

    return payload;
  });
};

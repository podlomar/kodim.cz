export default ({ filter, action }) => {
	filter('auth.create', async (payload, meta, context) => {
		if (payload.provider !== 'github') {
			return payload;
		}

		if (payload.first_name === null) {
			payload.first_name = payload.external_identifier;
		}

		const response = fetch('http://directus:8055/files/import', {
			method: 'POST',
			body: JSON.stringify({
				url: meta.providerPayload.userInfo.avatar_url,
				folder: '941c47ca-d818-4f30-9659-9106fcc716ca',
			}),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer 4rI4X0JsLRCazvXwbWqFwL-QOy5tTzQU`,
			},
		});
		const data = await response.json();
	});
};

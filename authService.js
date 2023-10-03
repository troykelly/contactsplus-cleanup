const axios = require('axios');
const qs = require('qs');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

module.exports = {
    getTokens: async (code) => {
        try {
            const response = await axios.post('https://api.contactsplus.com/v3/oauth.exchangeAuthCode',
                qs.stringify({
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    redirect_uri: REDIRECT_URI,
                    code: code
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            const { access_token, refresh_token } = response.data;
            return { accessToken: access_token, refreshToken: refresh_token };

        } catch (err) {
            console.error("An error occurred while getting the access token and refresh token: ", err);
            return null;
        }
    },

    // New function to get count of contacts
    getContactsCount: async (accessToken) => {
        try {
            // Since your HTTP client supports SSL with Server Name Identification (SNI),
            // we can make an HTTPS request directly to the endpoint.
            const response = await axios.post('https://api.contactsplus.com/api/v1/contacts.scroll',
                {
                    size: 1  // fetch only 1 contact
                },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Return the total number of contacts
            return response.data.total;
        } catch (err) {
            console.error(`Failed to get contacts count: ${err.message}`);
            return null;
        }
    }
}

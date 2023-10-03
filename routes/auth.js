const express = require('express');
const jwt = require('jsonwebtoken');
const { getTokens, getContactsCount } = require('../authService');

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

router.get('/', async (req, res) => {
    const refreshTokenValue = req.cookies.refreshToken || req.get('X-CONTACTSPLUS-REFRESH') || req.query.refresh;

    if (refreshTokenValue) {
        // Check and refresh access token if necessary
        const tokens = await getTokens(refreshTokenValue);

        if (tokens) {
            res.cookie('accessToken', tokens.accessToken, { httpOnly: true });
        } else {
            res.status(403).send('Error refreshing access token.');
        }
    } else {
        const state = jwt.sign({ foo: 'bar' }, process.env.SECRET_KEY);
        const authUrl = `https://app.contactsplus.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}&scope=contacts.read,contacts.write,account.read`;
        res.redirect(authUrl);
    }
});

router.get('/callback', async (req, res) => {
    const { code } = req.query;
    const tokens = await getTokens(code);

    if (tokens) {
        res.cookie('accessToken', tokens.accessToken, { httpOnly: true });
        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });

        // Redirect to the '/contactsCount' route that will show the total contacts count
        res.redirect('/contactsCount');
    } else {
        res.status(400).send('Error getting access tokens.');
    }
});

router.get('/contactsCount', async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const contactsCount = await getContactsCount(accessToken);

    if (contactsCount !== null) {
        res.send(`<h1>You have a total of ${contactsCount} contacts.</h1>`);
    } else {
        res.send('<h1>Error getting contacts count.</h1>');
    }
});

module.exports = router;

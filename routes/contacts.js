const express = require('express');
const { getContactsCount } = require('../authService');

const router = express.Router();

router.get('/', async (req, res) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.redirect('/login');
    }

    const contactsCount = await getContactsCount(accessToken);

    res.render('Contacts', { contactsCount });
});

module.exports = router;

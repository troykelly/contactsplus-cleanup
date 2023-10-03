const React = require('react');
const { Typography, Container } = require("@material-ui/core");

const Contacts = ({ contactsCount }) => (
    <Container>
        <Typography variant="h3">
            You have a total of {contactsCount} contacts.
        </Typography>
    </Container>
);

module.exports = Contacts;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [contactsCount, setContactsCount] = useState(null);

    useEffect(() => {
        // Fetch the total number of contacts when the component is mounted
        axios.get('/login')
            .then(response => setContactsCount(response.data.totalContacts))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>You have a total of {contactsCount} Contacts.</h1>
        </div>
    );
}

export default App;

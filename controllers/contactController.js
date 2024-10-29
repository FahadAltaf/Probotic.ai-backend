
const { fetchContacts } = require('../models/contactModel');

const getContacts = async (req, res) => {
    try {
        const contacts = await fetchContacts(req);
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getContacts };

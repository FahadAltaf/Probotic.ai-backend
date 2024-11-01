
const { getOrgnizations, insertOrganization } = require('../models/orgnizationModel');

const fetchOrgnization = async (req, res) => {

    try {
        const organization = await getOrgnizations(req);
        res.status(200).json(organization);
    } catch (error) {
        console.error('Error fetching chatbots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const createOrganization = async (req, res) => {
    try {
        const organization = await insertOrganization(req);
        res.status(200).json(organization);
    } catch (error) {
        console.error('Error fetching chatbots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { fetchOrgnization, createOrganization };

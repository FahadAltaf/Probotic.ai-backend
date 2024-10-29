const { fetchConversation } = require('../models/conversationModel');

const getConversation = async (req, res) => {

    try {
        const chatbots = await fetchConversation(req);
        res.status(200).json(chatbots);
    } catch (error) {
        console.error('Error fetching conversation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { getConversation };

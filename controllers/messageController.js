const { fetchMessage } = require('../models/messageModel');

const getMessages = async (req, res) => {

    try {
        const chatbots = await fetchMessage(req);
        res.status(200).json(chatbots);
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { getMessages };

const { fetchChatbots, insertChatbot, findChatbotById ,configChatbotById } = require('../models/chatbotModel');

const getChatbots = async (req, res) => {

    try {
        const chatbots = await fetchChatbots(req);
        res.status(200).json(chatbots);
    } catch (error) {
        console.error('Error fetching chatbots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const storeChatbots = async (req,res)=>{
    try {
        const chatbots = await insertChatbot(req);
        res.status(200).json(chatbots);
    } catch (error) {
        console.error('Error fetching chatbots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const findChatbot = async (req,res) =>{
    try {
        const chatbot = await findChatbotById(req);
        res.status(200).json(chatbot);
    } catch (error) {
        console.error('Error fetching chatbots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const configChatbot = async (req,res)=>{
    try {
        const chatbot = await configChatbotById(req);
        res.status(200).json(chatbot);
    } catch (error) {
        console.error('Error fetching chatbots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
   
}

module.exports = { getChatbots,storeChatbots ,findChatbot ,configChatbot};

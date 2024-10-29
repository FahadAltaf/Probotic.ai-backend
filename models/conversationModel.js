const prisma = require("../config/prisma");


const fetchConversation = async (req) => {
    const { organization_id } = req.body;
    try {
        return await prisma.conversations.findMany({
            where: { organization_id }
        });
    } catch (error) {
        console.error('Error fetching chatbots:', error);
        throw new Error('Failed to fetch chatbots');
    }
};


module.exports = {
    fetchConversation,
};

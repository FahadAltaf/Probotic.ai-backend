const prisma = require("../config/prisma");


const fetchMessage = async (req) => {
    const { organization_id,conversation_id } = req.body;
    try {
        return await prisma.messages.findMany({
            where: { conversation_id, organization_id }
        });
    } catch (error) {
        console.error('Error fetching chatbots:', error);
        throw new Error('Failed to fetch chatbots');
    }
};


module.exports = {
    fetchMessage,
};

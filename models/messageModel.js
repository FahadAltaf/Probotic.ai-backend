const PrismaService = require("../config/service");
const prismaService = new PrismaService();

const fetchMessage = async (req) => {
    const { organizationId,conversationId } = req.body;
    try {
        const conditions = [
            { fieldName: 'organization_id', fieldValue: organizationId },
            { fieldName: 'conversation_id', fieldValue: conversationId },
        ];
        
        const message = await prismaService.getManyByMultipleFields('messages', conditions);
        return message;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw new Error('Failed to fetch messages');
    }





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

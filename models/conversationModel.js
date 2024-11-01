const PrismaService = require("../config/service");
const prismaService = new PrismaService();


const fetchConversation = async (req) => {
    const { organizationId, chatbot_id } = req.body;
    try {
        const conditions = [
            { fieldName: 'orgnization_id', fieldValue: organizationId }
        ];
        
        const conversations = await prismaService.getManyByMultipleFields('conversations', conditions);

        return conversations;
    } catch (error) {
        console.error('Error finding conversations:', error);
        throw new Error('Failed to find conversations');
    }
}

module.exports = {
    fetchConversation,
};

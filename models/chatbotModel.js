const PrismaService = require("../config/service");
const prismaService = new PrismaService();

const fetchChatbots = async (req) => {
    const { userId, organizationId } = req.body;
    try {
        const conditions = [
            { fieldName: 'user_id', fieldValue: userId },
            { fieldName: 'orgnization_id', fieldValue: organizationId }
        ];
        return await prismaService.getManyByMultipleFields('chatbots', conditions);
    } catch (error) {
        console.error('Error fetching chatbots:', error);
        throw new Error('Failed to fetch chatbots');
    }
};

const insertChatbot = async (req) => {
    const { 
        userId, 
        name, 
        description = '', 
        avatar, 
        organizationId,
    } = req.body;
    try {
        const data = {
            user_id: userId,
            orgnization_id: organizationId,
            name,
            description,
            avatar,
            created_at: new Date(),
            updated_at: new Date()
        };
        Object.keys(data).forEach(key => {
            if (data[key] === undefined) {
                delete data[key];
            }
        });

        return await prismaService.insert('chatbots', data);
    } catch (error) {
        console.error('Error inserting chatbot:', error);
        throw new Error('Failed to insert chatbot');
    }
};

const findChatbotById = async (req) => {
    try {
        const { userId, organizationId } = req.body;
        const { id } = req.params;
        const conditions = [
            { fieldName: 'user_id', fieldValue: userId },
            { fieldName: 'orgnization_id', fieldValue: organizationId },
            { fieldName: 'id', fieldValue: id }
        ];
        
        const results = await prismaService.getManyByMultipleFields('chatbots', conditions);
        return results[0]; 
    } catch (error) {
        console.error('Error finding chatbot:', error);
        throw new Error('Failed to find chatbot');
    }
}

const configChatbotById = async (req) => {
    const { 
        userId, 
        organizationId, 
        id, 
        name, 
        role, 
        industry,
        business_information,
        faqs,
        products,
        documents,
        plain_text
    } = req.body;
    
    try {
        const updateData = {
            name,
            role,
            industry,
            business_information,
            faqs,
            products,
            documents,
            plain_text
        };

        // Filter out undefined values
        Object.keys(updateData).forEach(key => 
            updateData[key] === undefined && delete updateData[key]
        );

        return await prismaService.update('chatbots', 'id', id, updateData, true);
    } catch (error) {
        console.error('Error updating chatbot:', error);
        throw new Error('Failed to update chatbot');
    }
}

module.exports = {
    fetchChatbots,
    insertChatbot,
    findChatbotById,
    configChatbotById
};

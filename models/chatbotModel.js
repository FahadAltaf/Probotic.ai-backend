const prisma = require("../config/prisma");


const fetchChatbots = async (req) => {
    const { userId, organization_id } = req.body;
    try {
        return await prisma.chatbots.findMany({
            where: { user_id: userId, organization_id }
        });
    } catch (error) {
        console.error('Error fetching chatbots:', error);
        throw new Error('Failed to fetch chatbots');
    }
};


const insertChatbot = async (req) => {
    const { userId, name, description, avatar, organizationId } = req.body;
    try {
        return await prisma.chatbots.create({
            data: {
                user_id: userId,
                orgnization_id: organizationId,
                name,
                description,
                avatar
            }
        });
    } catch (error) {
        console.error('Error inserting chatbot:', error);
        throw new Error('Failed to insert chatbot');
    }
};


const findChatbotById = async (req) => {
    try {
        const { userId, organization_id } = req.body;
        const { id } = req.params; // Get id from request parameters
        return await prisma.chatbots.findFirst({
            where: {
                user_id: userId,
                organization_id,
                id: id
            }
        });
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
        return await prisma.chatbots.update({
            where: {
                'id': id,
                'user_id': userId,
                'orgnization_id': organizationId,
            },
            data: {
                name,
                role,
                industry,
                business_information,
                faqs,
                products,
                documents,
                plain_text
            },
        });
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

const prisma = require("../config/prisma");
const { hasPermission, getSession, getAuth } = require("../helpers/auth");

const platformList = async (req) => {
    const { userId, organizationId, chatbot_id } = req.body;
    try {
        const platforms = await prisma.messagingPlatform.findMany({
            where: {
                is_available: true
            }
        });
        const serializedPlatforms = platforms.map(platform => ({
            ...platform,
            id: platform.id.toString(),
        }));

        return serializedPlatforms;
    } catch (error) {
        console.error('Error finding platforms:', error);
        throw new Error('Failed to find platforms');
    }
}

const findPlatformByName = async (platformName) => {
    const platform = await prisma.messagingPlatform.findFirst({
        where: { name: platformName }
    });
    if (!platform) {
        throw new Error('Platform not found');
    }
    return platform;
}

const findChannelByUId = async (req) => {
    const { userId, organizationId, chatbotId } = req.body;
    try {
        const channels = await prisma.channels.findMany({
            where: {
                orgnization_id: organizationId,
                OR: [
                    { chatbot_id: null },
                    { chatbot_id: chatbotId }
                ]
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return channels;
    } catch (error) {
        console.error('Error finding channels:', error);
        throw new Error('Failed to find channels');
    }
}

const fetchChannels = async (req) => {
    const { userId, organizationId } = req.body;
    try {
        const channels = await prisma.channels.findMany({
            where: {
                orgnization_id: organizationId,
            }
        });

        return channels;
    } catch (error) {
        console.error('Error fetching channels:', error);
        throw new Error('Failed to fetch channels');
    }
}

const storeChannels = async (req) => {
    const { userId, organizationId, name, platformName, configuration } = req.body;
    try {
        const platform = await findPlatformByName(platformName);
        const newChannel = await prisma.channels.create({
            data: {
                orgnization_id: organizationId,
                name,
                platform_id: platform.id,
                platform_name: platform.name,
                configuration: configuration
            }
        });
        await prisma.channelOwners.create({
            data: {
                channel_id: newChannel.id,
                user_id: userId,
                orgnization_id: organizationId
            }
        });
        return newChannel;
    } catch (error) {
        console.error('Error creating channel:', error);
        throw new Error('Failed to create channel');
    }
}

const updateChannel = async (req) => {

    try {
        const { organizationId, channelId, chatbotId } = req.body;
        const updatedChannel = await prisma.channels.update({
            where: {
                id: channelId,
                orgnization_id: organizationId,
            },
            data: {
                chatbot_id: chatbotId,
            }
        });

        return updatedChannel;
    } catch (error) {
        console.error('Error updating channel:', error);
        throw new Error('Failed to update channel');
    }
}

module.exports = {
    findChannelByUId,
    platformList,
    fetchChannels,
    storeChannels,
    updateChannel
};

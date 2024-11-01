const PrismaService = require("../config/service");
const prismaService = new PrismaService();

const { hasPermission, getUserIdFromToken, getAuth } = require("../helpers/auth");

const platformList = async (req) => {
    const { organizationId, chatbot_id } = req.body;
    try {
        const conditions = [
            { fieldName: 'is_available', fieldValue: true }
        ];
        
        const platforms = await prismaService.getManyByMultipleFields('messaging_platform', conditions);
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

    const conditions = [
        {   fieldName: 'name', 
            fieldValue: platformName
        }
    ]
    const platform = await prismaService.getManyByMultipleFields('messaging_platform', conditions);
    if (!platform) {
        throw new Error('Platform not found');
    }
    return platform[0];
}

const findChannelByUId = async (req) => {
    const { userId, organizationId, chatbotId } = req.body;
    try {
        const whereConditions = [
            { fieldName: 'orgnization_id', fieldValue: organizationId }
        ];
        
        const orConditions = [
            { chatbot_id: null },
            { chatbot_id: chatbotId }
        ];

        const orderBy = {
            field: 'created_at',
            direction: 'desc'
        };

        return await prismaService.findManyWithOrCondition(
            'channels',
            whereConditions,
            orConditions,
            orderBy
        );
    } catch (error) {
        console.error('Error finding channels:', error);
        throw new Error('Failed to find channels');
    }
}

const fetchChannels = async (req) => {
    const { userId, organizationId } = req.body;
    try {
        const conditions = [
            { fieldName: 'orgnization_id', fieldValue: organizationId }
        ];
        return await prismaService.getManyByMultipleFields('channels', conditions);
    } catch (error) {
        console.error('Error fetching channels:', error);
        throw new Error('Failed to fetch channels');
    }
}

const storeChannels = async (req) => {
    const { organizationId, name, platformName, configuration } = req.body;
    const userId = getUserIdFromToken(req);

    try {
        const platform = await findPlatformByName(platformName);
        
        const channelData = {
            orgnization_id: organizationId,
            name,
            platform_id: platform.id,
            platform_name: platform.name,
            configuration: configuration,
            created_at: new Date(),
            updated_at: new Date()
        };

        // Remove any undefined values
        Object.keys(channelData).forEach(key => {
            if (channelData[key] === undefined) {
                delete channelData[key];
            }
        });
        const newChannel = await prismaService.insert('channels', channelData);

        const ownerData = {
            channel_id: newChannel.id,
            user_id: userId,
            orgnization_id: organizationId,
            created_at: new Date(),
            updated_at: new Date()
        };

        await prismaService.insert('channel_owners', ownerData);
        return newChannel;
    } catch (error) {
        console.error('Error creating channel:', error);
        throw new Error('Failed to create channel');
    }
}

const updateChannel = async (req) => {
    try {
        const { organizationId, channelId, chatbotId } = req.body;
        
        const updateData = {
            chatbot_id: chatbotId,
            updated_at: new Date()
        };

        const updatedChannel = await prismaService.update(
            'channels',           // table name
            'id',                 // primary key column
            channelId,           // primary key value
            updateData,          // data to update
            true                 // isUUID flag
        );

        return updatedChannel[0];  // service returns array, get first result
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

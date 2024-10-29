const { findChannelByUId, platformList, fetchChannels ,storeChannels ,updateChannel } = require('../models/channelModel');

const findChannel = async (req, res) => {
    try {
        const chatbot = await findChannelByUId(req);
        res.status(200).json(chatbot);
    } catch (error) {
        console.error('Error fetching chatbots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getPlatformList = async (req, res) => {
    try {
        const platforms = await platformList(req);
        res.status(200).json(platforms);
    } catch (error) {
        console.error('Error fetching serializedplatforms:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getChannels = async (req, res) => {
    try {
        const channels = await fetchChannels(req);
        const platforms = await platformList(req);
        res.status(200).json({ channels, platforms });
    } catch (error) {
        console.error('Error fetching channels:', error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

const createChannels = async (req, res) => {
    try {
        const channels = await storeChannels(req);
        res.status(200).json(channels);
    } catch (error) {
        console.error('Error create channels:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const configChannels = async (req, res) => {
    try {
        const channels = await updateChannel(req);
        res.status(200).json(channels);
    } catch (error) {
        console.error('Error fetching channel config:', error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

module.exports = { findChannel, getPlatformList, getChannels,createChannels,configChannels };

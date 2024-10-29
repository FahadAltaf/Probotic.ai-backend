const { insertUser } = require("../models/userModel");

const webHookManager = async (req, res) => {
    try {
        const body = req.body;
        const typeOfWebhook = body.type;
        const data = body.data;
        if (typeOfWebhook === "user.created") {
            await insertUser(data);
        }
        res.status(200).json({ message: "Webhook received successfully" });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { webHookManager };

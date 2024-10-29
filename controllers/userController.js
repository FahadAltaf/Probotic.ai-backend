const { insertUser ,fetchUserById } = require("../models/userModel");

const storeUser = async (req,res)=>{
    try {
        const user = await insertUser(req);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching chatbots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getUserById = async (req, res) => {
    try {
     
        const user = await fetchUserById(req);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { storeUser, getUserById };

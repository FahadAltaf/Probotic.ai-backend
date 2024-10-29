const { clerkClient } = require('@clerk/clerk-sdk-node');

const clerkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = await clerkClient.verifyToken(token);
    req.auth = {
      userId: decoded.sub,
      has: (permission) => decoded.org_permissions?.includes(permission) || false
    };
    next();
  } catch (error) {
    console.error('Clerk authentication error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};




module.exports = clerkAuth;

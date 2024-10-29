const getAuth = require('./get-auth');
const requireAuth = require('../middleware/require-auth');

const checkPermission = (permission) => {
    return (req, res, next) => {
        if (req.auth.has(permission)) {
            return next();
        }
        res.status(403).json({ error: 'Permission denied' });
    };
};
const getUserIdFromToken = (req) => {
    if (!req.auth || !req.auth.userId) {
        res.status(401).json({ error: 'Authentication required' });
    }
    return req.auth.userId;
};

module.exports = {
    getAuth,
    checkPermission,
    requireAuth,
    getUserIdFromToken,
};

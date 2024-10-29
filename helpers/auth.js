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

module.exports = {
    getAuth,
    checkPermission,
    requireAuth,

};
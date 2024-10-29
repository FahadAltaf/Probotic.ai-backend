const getAuth = require('../helpers/get-auth');

const requireAuth = () => {
  return (req, res, next) => {
    if (!req.clerkAuth) {
      return res.status(401).json({ error: 'Clerk middleware required' });
    }
    if (!getAuth(req).userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    next();
  };
};

module.exports = requireAuth;

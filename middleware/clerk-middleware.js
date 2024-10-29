const defaultClerkClient = require('../helpers/clerk-client');

const clerkMiddleware = (options = {}) => {
  return async (req, res, next) => {
    const clerkClient = options.clerkClient || defaultClerkClient;

    try {
      const requestState = await clerkClient.authenticateRequest(req);
      req.clerkAuth = requestState.toAuth();
      req.clerk = clerkClient;
      next();
    } catch (error) {
      console.error('Clerk authentication error:', error);
      res.status(401).json({ error: 'Authentication failed' });
    }
  };
};

module.exports = clerkMiddleware;

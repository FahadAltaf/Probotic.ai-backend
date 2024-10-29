const express = require('express');
const chatbotRoutes = require('./routes/chatbotRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const organizationRoutes = require('./routes/orgnizationRoutes');
const userRoutes = require('./routes/userRoutes');
const channelsRoutes = require('./routes/channelRoute');
const platformRoutes = require('./routes/platformRoutes');
const conversationRoute = require('./routes/conversationRoute');
const messagesRoute = require('./routes/messagesRoute');
const contactsRoute = require('./routes/contactRoute');

const bodyParser = require('body-parser');
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
const clerkAuth = require('./middlewares/clerkMiddleware');


const app = express();
const apiRouter = express.Router();

app.use(bodyParser.json());
app.use('/api/v1/webhook', webhookRoutes);

app.use(ClerkExpressWithAuth());

// Move API routes setup outside of the root route
apiRouter.use('/chatbots', chatbotRoutes);
apiRouter.use('/orgnization', organizationRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/channels', channelsRoutes);
apiRouter.use('/platforms',  platformRoutes);
apiRouter.use('/conversations',  conversationRoute);
apiRouter.use('/messages',  messagesRoute);
apiRouter.use('/contacts',  contactsRoute);

app.use('/api/v1', apiRouter);

app.get('/sign-in', (req, res) => {
    res.redirect(process.env.CLERK_SIGN_IN_URL);
});

module.exports = app;

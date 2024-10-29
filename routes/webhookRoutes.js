const express = require('express');
const { webHookManager } = require('../controllers/webhookController');

const router = express.Router();

router.post('/', webHookManager);
router.get('/', webHookManager);


module.exports = router;

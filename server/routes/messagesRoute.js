const addMessage = require('../controllers/addMessagesController');
const getMessages = require('../controllers/getMessagesController');

const router = require('express').Router();

router.post('/addMessage', addMessage);
router.post('/getMessages', getMessages)

module.exports = router;
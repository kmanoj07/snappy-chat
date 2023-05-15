const  Messages  = require('../models/Message');

const getMessages = async (req, res, next) => {
    try {
        console.log(req.body);
        const {from, to} = req.body;
        const messages = await Messages.find({
            users:{
                $all: [from, to],
            }
        }).sort({updatedAt: 1});

        const projectMessages = messages.map((msg) => {
            return {
                fromSelf:msg.sender.toString() === from,
                message:msg.message.text
            }
        });
        res.json(projectMessages);
    } catch(ex) {
        console.log('test exception');
        next(ex)
    }
};

module.exports = getMessages;
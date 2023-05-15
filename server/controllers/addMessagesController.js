const  Messages  = require('../models/Message');

const addMessage = async (req, res, next) => {

    try {
        const {from, to, message} = req.body;
        const data = await  Messages.create({
            message : {text: message},
            users: [from, to],
            sender: from,
        });

        if(data) {
            return res.status(201).json({msg: 'Message added successfully.'});
        } else {
            return res.status(504).json({msg: 'Failed to add message to databaase.'});
        }

    } catch (ex) {
        next(ex);
    }    

};

module.exports = addMessage;
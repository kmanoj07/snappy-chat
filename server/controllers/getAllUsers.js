const { json } = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res, next) => {
    try {
        // it will select all the users but not including own user id
        const users = await User.find({_id: {$ne:req.params.id} }).select([
            "email", "username", "avataarImage", "_id",
        ]);
        return res.status(200).json(users);
    } catch(ex) {
        next(ex);
    }
}

module.exports = getAllUsers;
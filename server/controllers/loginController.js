const User = require('../models/User');
const bcrypt = require('bcrypt');

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        // first check if this username present in db
        const user = await User.findOne({ username });
        if (user) {
            // validate the password of the user
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.json({ msg: "username or password does not exist!", status: false });
            } else {
                return res.json({msg:"user found", user, status: true});
            }
        } else {
            return res.json({ msg: "username or password does not exist!", status: false });
        }
    } catch (err) {
        // catch the err and pass to next
        next(err);
    }
    
};

module.exports = login;
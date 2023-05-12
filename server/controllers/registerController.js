const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
try {
    const { username, email, password } = req.body;
    // first check if this username present in db
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "username already used", status: false });
    }
    const usermailCheck = await User.findOne({ email });
    if (usermailCheck) {
      return res.json({ msg: "user email already used", status: false });
    }
    // encrypt the password using bcypt
    const hashPassword = await bcrypt.hash(password, 10);
    // creat a new user
    const createdUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    // in respone we do not need th password
    delete createdUser.password;
    res.status(201).json({msg: "User Created! ", createdUser, status: true});
  } catch (err) {
    // catch the err and pass to next
    next(err);
  }
};

module.exports = register;
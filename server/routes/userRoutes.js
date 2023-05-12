const register = require('../controllers/registerController');
const login = require("../controllers/loginController")
const setAvataarRoute = require('../controllers/setAvatarController')

const router = require('express').Router();

router.post("/register", register)
router.post("/login", login)
router.post("/setAvataarRoute/:id", setAvataarRoute)




module.exports = router;
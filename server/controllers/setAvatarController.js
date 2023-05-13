const User = require("../models/User");

const setAvataarRoute = async (req, res, next) => {
    try {
            const userId = req.params.id;
            const image = req.body.image;
            const userData = await User.findByIdAndUpdate(userId, {
                isAvataarImageSet: true,
                avataarImage: image,
            }, {new :true});

            return res.json({
                 id:userData._id,
                 isSet:userData.isAvataarImageSet,
                 image: userData.avataarImage,
                 status: true
            });
            
    } catch(ex) {
        next(ex);
    }
};

module.exports = setAvataarRoute;
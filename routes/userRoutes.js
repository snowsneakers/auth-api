const router = require("express").Router();
const {
     loginUser,
     signupUser,
     getProfile,
} = require("../controllers/userControllers");

router.post("/login", loginUser);
router.post("/signup", signupUser);
//maybe another route for other profiles
router.get("/profile/:username", getProfile);

module.exports = router;

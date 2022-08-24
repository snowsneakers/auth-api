const router = require("express").Router();
const {
     loginUser,
     signupUser,
     getProfile,
} = require("../controllers/userControllers");

router.post("/login", loginUser);
router.post("/signup", signupUser);

module.exports = router;

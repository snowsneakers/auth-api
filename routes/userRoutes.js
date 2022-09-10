const router = require("express").Router();
const {
     loginUser,
     signupUser,
     getProfile,
     updateAvatar,
     getUserByPostId
} = require("../controllers/userControllers");
const protect = require("../middleware/protect");

router.post("/login", loginUser);
router.post("/signup", signupUser);
//maybe another route for other profiles
router.get("/profile/:username", getProfile);
router.get("/:postId", getUserByPostId)
router.put("/updateAvatar", protect, updateAvatar)

module.exports = router;

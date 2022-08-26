const router = require("express").Router();
const protect = require("../middleware/protect");
const {
     getEntries,
     getSoloEntry,
     createEntry,
     deleteEntry,
     updateEntry,
     updateLikes,
} = require("../controllers/entryControllers");

router.use(protect);
router.get("/", getEntries);
router.get("/:id", getSoloEntry);
router.post("/", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);
router.put("/:id/likes", updateLikes);

module.exports = router;

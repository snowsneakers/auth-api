const router = require("express").Router();
const protect = require("../middleware/protect");
const {
     getEntries,
     getSoloEntry,
     createEntry,
     deleteEntry,
     updateEntry,
} = require("../controllers/entryControllers");

router.get("/", getEntries);
router.get("/:id", getSoloEntry);
router.use(protect);
router.post("/", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);


module.exports = router;

const Entry = require("../models/entryModel");

const getEntries = async (req, res) => {
     try {
          //filter entries by user that posted (for like profile maybe)
          // const entry = await Entry.find({ user_username: req.user.username });
          //gets all entries with creator attached
          const entry = await Entry.find({}).sort({ createdAt: -1 });
          res.status(200).json(entry);
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

const getSoloEntry = async (req, res) => {
     try {
          const entry = await Entry.findById(req.params.id);
          if (!entry) {
               res.status(404);
               throw Error("Entry not found");
          }
          res.status(200).json(entry);
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};
const createEntry = async (req, res) => {
     try {
          const entry = await Entry.create({
               start: req.body.start,
               end: req.body.end,
               text: req.body.text,
               user_username: req.user.username,
          });
          res.status(200).json(entry);
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};
const updateEntry = async (req, res) => {
     try {
          const entry = await Entry.findById(req.params.id);
          if (!entry) {
               res.status(404);
               throw Error("Entry not found");
          }
          const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, {
               text: req.body.text,
          });
          res.status(200).json({ message: `updated ${req.params.id}` });
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};
const deleteEntry = async (req, res) => {
     try {
          const entry = await Entry.findById(req.params.id);
          if (!entry) {
               res.status(404);
               throw Error("Entry not found");
          }
          const deletedEntry = await Entry.findByIdAndDelete(req.params.id);
          res.status(200).json(deletedEntry);
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

const updateLikes = async (req, res) => {
     try {
          const entry = await Entry.findById(req.params.id);
          if (!entry) {
               res.status(404);
               throw Error("Entry not found");
          }
          const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, {
               $push: { likes: req.user.username },
          });
          if (updatedEntry.likes.includes(req.user.username)) {
               await Entry.findByIdAndUpdate(req.params.id, {
                    $pull: { likes: req.user.username },
               });
          }

          res.status(200).json({ message: `liked ${req.params.id}` });
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

module.exports = {
     getEntries,
     getSoloEntry,
     createEntry,
     deleteEntry,
     updateEntry,
     updateLikes,
};

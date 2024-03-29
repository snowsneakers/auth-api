const Entry = require("../models/entryModel");
const Comment = require("../models/commentModel")

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
const getEntryByCategory = async (req, res) => {
     try {
          const entry = await Entry.find({category: req.params.id});
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
               title: req.body.title,
               image: req.body.image,
               category: req.body.category,
               summary: req.body.summary,
               body: req.body.body.split("*break*")
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
               title: req.body.title,
               image: req.body.image,
               category: req.body.category,
               summary: req.body.summary,
               body: req.body.body.split("*break*")
          }, {new: true});
          res.status(200).json(updatedEntry);
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

module.exports = {
     getEntries,
     getSoloEntry,
     createEntry,
     deleteEntry,
     updateEntry,
     getEntryByCategory
};

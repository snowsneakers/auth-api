const Entry = require("../models/entryModel");

const getEntries = async (req, res) => {
     try {
          const entry = await Entry.find({ user_id: req.user.id });
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
               text: req.body.text,
               user_id: req.user.id,
          });
          res.status(200).json(req.body.text);
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
          res.status(200).json({ message: `deleted ${req.params.id}` });
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
};

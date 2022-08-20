const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
     {
          text: { type: String, required: true },
          user_id: { type: String, requried: true },
     },
     { timestamps: true }
);

module.exports = mongoose.model("entries", entrySchema);

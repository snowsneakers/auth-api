const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
     {
          title: { type: String, required: true },
          image: { type: String, required: true },
          category: { type: String, required: true },
          summary: { type: String, requried: true },
          body: { type: String, required: true },
     },
     { timestamps: true }
);

module.exports = mongoose.model("posts", entrySchema);

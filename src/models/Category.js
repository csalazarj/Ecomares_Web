const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  //images: { type: [{ type: String, required: true }], default: [] },
  images: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = model("Category", CategorySchema);
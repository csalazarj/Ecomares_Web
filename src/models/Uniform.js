const { Schema, model } = require("mongoose");

const UniformSchema = new Schema({
  image: { type: String, required: true },
  description: { type: String, required: true },
  gender: { type: String, required: true },
  form: { type: String, required: true },
  season: { type: String, required: true },
  limit_date: { type: Date },
});

module.exports = model("Uniform", UniformSchema);

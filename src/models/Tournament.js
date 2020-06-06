const { Schema, model } = require("mongoose");

const TournamentSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  podium: { type: [{ type: String, required: true }], default: [] },
});

module.exports = model("Tournament", TournamentSchema);

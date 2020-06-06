const { Schema, model } = require("mongoose");

const MemberSchema = new Schema({
  name: { type: String, required: true },
  //   username: { type: String, required: true, unique: true },
  //   password: { type: String, required: true },
  id_card: { type: String, required: true, unique: true },
  birthdate: { type: Date },
  alias: { type: String },
  positions: { type: String, required: true },
  archievements: { type: String, required: true, default: "Ninguno" },
  // positions: { type: [{ type: String, required: true }], default: [] },
  // achievements: { type: [{ type: String, required: true }], default: [] },
  image: { type: String},
  role: { type: String, enum: ["jugador", "entrenador"], default: "jugador" },
  current_category: { type: String, enum: ["Élite Masculino", "Élite Fememina", "Ascenso", "Iniciación"], default: "Iniciación" },
});

module.exports = model("Member", MemberSchema);

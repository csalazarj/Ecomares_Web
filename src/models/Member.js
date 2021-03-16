const { Schema, model } = require("mongoose");

const MemberSchema = new Schema({
  name: { type: String, required: true },
  number: { type: String, default: "No tiene" },
  id_card: { type: String, required: true, unique: true },
  birthdate: { type: Date },
  alias: { type: String },
  positions: {
    type: String,
    enum: ["Portero", "Defensa", "Medio"],
    required: true,
  },
  archievements: { type: String, default: "Ninguno" },
  image: { type: String },
  role: { type: String, enum: ["jugador", "entrenador"], default: "jugador" },
  current_category: {
    type: String,
    enum: ["Élite Masculino", "Élite Fememina", "Ascenso", "Iniciación"],
    default: "Iniciación",
  },
  //   username: { type: String, required: true, unique: true },
  //   password: { type: String, required: true },
});

module.exports = model("Member", MemberSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
  numInnings: Number,
  positions: Array,
  minPlayers: Number,
  sexMin: {
    sex: String,
    min: Number
  },
  infieldReq: {
    sex: String,
    min: Number
  },
  outfieldReq: {
    sex: String,
    min: Number
  },
  battingReq: {
    sex: String,
    min: Number
  }
});

const PlayerSchema = new Schema({
  firstName: String,
  lastName: String,
  sex: String,
  availability: Boolean,
  lineup: Array,
  battingOrder: Number,
  battingRotateWith: String
});

const TeamSchema = new Schema({
  teamName: String,
  players: [PlayerSchema],
  settings: [SettingsSchema],
  login: String,
  email: String,
  password: String
});

module.exports = mongoose.model("Team", TeamSchema);
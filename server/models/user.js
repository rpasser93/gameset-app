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

const LineupSchema = new Schema({
  inning1: String,
  inning2: String,
  inning3: String,
  inning4: String,
  inning5: String,
  inning6: String,
  inning7: String
});

const PlayerSchema = new Schema({
  firstName: String,
  lastName: String,
  sex: String,
  availability: Boolean,
  preferredPos: Array,
  lineup: [LineupSchema]
});

const TeamSchema = new Schema({
  name: String,
  players: [PlayerSchema],
  settings: [SettingsSchema]
});

const UserSchema = new Schema({
  name: String,
  password: String,
  teams: [TeamSchema]
});

module.exports = mongoose.model("User", UserSchema);
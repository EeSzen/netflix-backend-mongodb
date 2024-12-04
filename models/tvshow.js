// schema for movies collection
const { Schema, model } = require("mongoose");

// setup the schema
const tvshowSchema = new Schema({
  title: String,
  creator: String,
  premiere_year: Number,
  end_year: Number,
  seasons: Number,
  genre: String,
  rating: Number,
});

const Tvshow = model("Tvshow", tvshowSchema);
module.exports = Tvshow;

const express = require("express");
// create a router for movies
const router = express.Router();

const Tvshow = require("../models/tvshow");

router.get("/", async (req, res) => {
  const genre = req.query.genre;
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;

  let filter = {};

  if(genre){
    filter.genre = genre;
  }
  if(rating){
    filter.rating = { $gt: rating };
  }
  if(premiere_year){
    filter.premiere_year = { $gt: premiere_year };
  }

  const tvshows = await Tvshow.find(filter);
  res.send(tvshows);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const tvshow = await Tvshow.findById(id);
  res.send(tvshow);
});

module.exports = router;

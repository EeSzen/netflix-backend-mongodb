const express = require("express");
// create a router for movies
const router = express.Router();

//  load the model
const Movie = require("../models/movie");

// create the routes to get all the movies(/movies)
router.get("/", async (req, res) => {
  console.log(req.query);
  const genre = req.query.genre;
  const rating = req.query.rating;
  const director = req.query.director;
  // create a container for filter
  let filter = {};

  // if genre exists, pass it to the filter container
  if (genre) {
    filter.genre = genre;
  }
  // if rating exists, pass it to the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }
  // if director exists, pass it to the filter container
  if (director) {
    filter.director = director;
  }

  // apply filter in .find()
  const movies = await Movie.find(filter);
  res.send(movies);
});

// get one movie by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  res.send(movie);
});

module.exports = router;

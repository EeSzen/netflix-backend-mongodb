const express = require("express");
// create a router for movies
const router = express.Router();

const {
  getTvshows,
  getTvshow,
  addTvshow,
  updateTvshow,
  deleteTvshow,
} = require("../controller/tvshow");

router.get("/", async (req, res) => {
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const premiere_year = req.query.premiere_year;

    const tvshows = await getTvshows(genre, rating, premiere_year);
    res.status(200).send(tvshows);
  } catch (error) {
    res.status(404).send(error._message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const tvshow = await getTvshow(id);
  res.status(200).send(tvshow);
});

// add shows
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check for error
    if (
      !title ||
      !creator ||
      !premiere_year ||
      !end_year ||
      !seasons ||
      !genre ||
      !rating
    ) {
      return res.status(400).send({
        error: error._message,
      });
    }

    const newTvshow = await addTvshow(
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating
    );
    res.status(200).send(newTvshow);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// update shows
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    const updatedTvshow = await updateTvshow(
      id,
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating
    );
    res.status(200).send(updatedTvshow);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete shows
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteTvshow(id);
    res.status(200).send({
      message: `Tv Show with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;

const express = require("express");
// create a router for movies
const router = express.Router();

// import the functions from controller
const {
  getMovies,
  getMovie,
  addNewMovie,
  updateMovie,
  deleteMovie,
} = require("../controller/movie");

/* 
  create the routes (CRUD)
  GET /movies - get all the movies
  GET /movies/:id - get one movie by id
  POST /movies - add new movie
  PUT /movies/:id - update movie
  DELETE /movies/:id - delete movie
*/

// create the routes to get all the movies(/movies)
router.get("/", async (req, res) => {
  try {
    console.log(req.query);
    const genre = req.query.genre;
    const rating = req.query.rating;
    const director = req.query.director;
    // use the getMovies from the controller to laod the movies data
    const movies = await getMovies(genre, rating, director);
    res.status(200).send(movies);
  } catch (error) {
    // if there is an error show this
    res.status(400).send(error._message);
  }
});

// get one movie by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await getMovie(id);
  res.send(movie);
});

// add movie
// POST http://localhost:5555/movies
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check for error
    if (!title || !director || !release_year || !genre || !rating) {
      return res.status(400).send({
        error: error._message,
      });
    }

    // pass in all the data to add new movie function
    const newMovie = await addNewMovie(
      title,
      director,
      release_year,
      genre,
      rating
    );
    res.status(200).send(newMovie);
  } catch (error) {
    // if there is an error show this
    res.status(400).send({
      error: error._message,
    });
  }
});

// update movie
// PUT http://localhost:5555/movies/9kdm40ikd93k300dkd3o
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // pass in the data into the updateMovie function
    const updatedMovie = await updateMovie(
      id,
      title,
      director,
      release_year,
      genre,
      rating
    );
    res.status(200).send(updatedMovie);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete movie
// DELETE http://localhost:5555/movies/9kdm40ikd93k300dkd3o
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // trigger the deleteMovie function
    await deleteMovie(id);
    res.status(200).send({
      message: `Movie with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;

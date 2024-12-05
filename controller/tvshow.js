const Tvshow = require("../models/tvshow");

const getTvshows = async (genre, rating, premiere_year) => {
  let filter = {};

  if (genre) {
    filter.genre = genre;
  }
  if (rating) {
    filter.rating = { $gt: rating };
  }
  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }

  const tvshows = await Tvshow.find(filter);
  return tvshows;
};

// get one tvshow
const getTvshow = async (id) => {
  const tvshow = await Tvshow.findById(id);
  return tvshow;
};

// add new show
const addTvshow = async (
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) => {
  const newTvshow = new Tvshow({
    title,
    creator,
    premiere_year,
    end_year,
    seasons,
    genre,
    rating,
  });
  await newTvshow.save();
  return newTvshow;
};

// Update tvshows
const updateTvshow = async (
  id,
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) => {
  const updatedTvshow = await Tvshow.findByIdAndUpdate(
    id,
    {
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating,
    },
    {
      new: true,
    }
  );
  return updatedTvshow;
};

// delete tvshow
const deleteTvshow = async (id) => {
  return await Tvshow.findByIdAndDelete(id);
};

// export all the functions
module.exports = {
  getTvshows,
  getTvshow,
  addTvshow,
  updateTvshow,
  deleteTvshow,
};

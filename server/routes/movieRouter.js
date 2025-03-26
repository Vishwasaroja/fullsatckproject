const { addMovie,getAllMovies,updatesMovies,deleteMovies,getMovieById } = require('../controllers/movieController');

const movieRouter = require('express').Router();


movieRouter.post("/add-movies" ,addMovie);
movieRouter.get("/get-all-movies" ,getAllMovies);
movieRouter.put("/update-movies" ,updatesMovies);
movieRouter.put("/delete-movies" ,deleteMovies);
movieRouter.get("/movie/:id" ,getMovieById);

module.exports = movieRouter;
const Movie = require("../models/moviemodels");

const getMovieById = async (req, res) => {
    try {
    const movie = await Movie.findById(req.params.id);
    res.send({
    success: true,
    message: "Movie fetched successfully!",
    data: movie,
   });
    } catch (err) {
    res.send({
    success: false,
    message: err.message,
    });
    }
    };

 const addMovie = async (req, res) => {
 try {
 const newMovie = new Movie(req.body);
 await newMovie.save();
 res.send({
 success: true,
 message: "New movie has been added!",
 });
 } catch (error) {
 res.send({
 success: false,
 message: err.message,
 });
 }
 };
 

 const getAllMovies = async (req,res)=>{
    try {
        const allMovies = await Movie.find();
        res.send({
            message:"All Movies has been fetched",
            success:true,
            data:allMovies,
        })
    } catch (error) {
        console.log(error);
        res.send({
            message:error.message,
            success:false
        })
    }
 }


 const updatesMovies = async (req,res)=>{
    try {
        await Movie.findByIdAndUpdated(req.body.movieId,req.body);
        res.send({
            message:"Movie Updated",
            success:true
        })
    } catch (error) {
        console.log(error);
        res.send({
            message:"Update failed",
            success: false
        })
    }
 }

const deleteMovies = async (req,res)=>{
    try {
        // const movieId= req.params.movieId;
      await Movie.findByIdAndDelete(req.body.movieId);
      res.send({
        message:"Movies Deleted Successfully",
        success:true
      })  
    } catch (error) {
        console.log(error);
        res.send({
            message:"Failed to delete Movie",
            success:false
        })
    }
}

 module.exports = { getMovieById,addMovie,getAllMovies ,updatesMovies,deleteMovies};
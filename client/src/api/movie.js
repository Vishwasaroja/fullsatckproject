import { axiosInstance } from "./index";

export const getMovieById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/movies/movie/${id}`);
        return response.data;
    } catch (err) {
        return err.response;
    }
};

export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get("api/movies/get-all-movies");
        return response.data;

    } catch (error) {
        console.log(error);
    }
};

export const addMovie = async (values) => {
    try {
        const response = await axiosInstance.post("api/movies/add-movies", values);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const updatesMovies = async (values) => {
    try {
        const response = await axiosInstance.put("api/movies/update-movies", values);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteMovies = async (payload) => {
    try {
        const response = await axiosInstance.put("api/movies/delete-movies", payload);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
import { axiosInstance } from "./index";


export const addTheatre = async (payload)=>{
    try {
      const response = await axiosInstance.post("/api/theatres/add-theatre",payload);
      return response.data;  
    } catch (error) {
        return error.response;
    }
}

export const getAllTheatresForAdmin = async ()=>{
    try {
        const response = await axiosInstance.get("/api/theatres/get-all-theatre");
        return response.data; 
    } catch (error) {
        return error.response;
    }
} 



export const getAllTheatres = async (ownerId)=>{
    try {
        const response = await axiosInstance.get(
            `/api/theatres/get-all-theatre-by-owner/${ownerId}`
           
        );
       
        return response.data; 
    } catch (error) {
        console.log(error);
        return error.response;
    }
}  

export const updateTheatre = async  (payload)=>{
    try {
        const response = await axiosInstance.put("/api/theatres/update-theatre",payload);
        return response.data; 
    } catch (error) {
        return error.response;
    }
}  

export const deleteTheatre = async(payload)=>{
    try {
        const response = await axiosInstance.delete(`/api/theatres/delete-theatre/${payload}`);
        return response.data; 
    } catch (error) {
        return error.response;
    }
}  




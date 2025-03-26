const theatreRoute = require("express").Router();
const Theatre= require("../models/theatreModel");


theatreRoute.post("/add-theatre",async(req,res)=>{
try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
        success:true,
        message:"Theatre added Successfully"
    })
} catch (error) {
    return res.status(500).json({message:error.message});
}
})


theatreRoute.put("/update-theatre", async(req,res)=>{
    try {
        const theatre= await Theatre.findById(req.body.theatreId);
        if(!theatre){
            return res.status(404).json({success:false,message:"Theatre not found"});  
        }
await Theatre.findByIdAndUpdate(req.body.theatreId,req.body)
        res.send({
            success:true,
            message:"Theatre updated Successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
})

theatreRoute.delete("/delete-theatre/:theatreId" , async (req,res)=>{
    try {
        console.log("deleting theatre",req.params.theatreId);
        await Theatre.findByIdAndDelete(req.params.theatreId);
        res.send({
            success:true,
            message:"Theatre deletedd Successfully"
        })
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
})

theatreRoute.get("/get-all-theatre",async(req,res)=>{
    try{
const theatre = await Theatre.find().populate("owner");
res.send({
    success:true,
    message:"All Theatre Fetched",
    data:theatre,
})
    }catch(error){
        return res.status(500).json({message:error.message});
    }
})

theatreRoute.get("/get-all-theatre-by-owner/:ownerId",async(req,res)=>{
    console.log("Owner ID:", req.params.ownerId); // Log the ownerId
    try{
const theatre = await Theatre.find({owner:req.params.ownerId});
res.send({
    success:true,
    message:"All Theatre Fetched",
    data:theatre,
})
    }catch(error){
        return res.status(500).json({message:error.message});
    }
})


module.exports = theatreRoute;
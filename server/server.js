const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();

require('dotenv').config();

const connectDB = require('./config/db');
const userRoute = require('./routes/userRoutes');
const movieRouter = require('./routes/movieRouter');
const theatreRoute = require('./routes/threatreRoute');
const showRouter = require("./routes/showRouter")
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use('/api/users',userRoute);
app.use('/api/movies',movieRouter);
app.use("/api/theatres",theatreRoute);
app.use("/api/shows",showRouter);
app.listen(8082,()=>{
    console.log('Listening on port 8082');
})
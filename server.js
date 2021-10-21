const express= require("express");
const dotenv= require ("dotenv");
dotenv.config({path:"./config/config.env"});

const connectDB= require("./config/db");



connectDB();



const reviewsRoute= require("./router/reviews.js");

const app= express();
app.use(express.json());
const PORT= process.env.PORT || 5000;

app.use("/api/v1/reviews", reviewsRoute);




app.listen (PORT, console.log(`server running in ${process.env.NODE_ENV} mode and port is ${PORT}`));


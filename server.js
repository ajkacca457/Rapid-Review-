const express= require("express");
const dotenv= require ("dotenv");
dotenv.config({path:"./config/config.env"});
const cookieParser= require("cookie-parser");
const connectDB= require("./config/db");
const ErrorHandler= require("./middlewares/errorHandler");


connectDB();



const reviewsRoute= require("./router/reviews.js");
const authRoute= require( "./router/auth.js");

const app= express();
app.use(express.json());
app.use(cookieParser());
const PORT= process.env.PORT || 5000;

app.use("/api/v1/reviews", reviewsRoute);
app.use("/api/v1/auth", authRoute);
app.use(ErrorHandler);



app.listen (PORT, console.log(`server running in ${process.env.NODE_ENV} mode and port is ${PORT}`));


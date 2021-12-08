const express= require("express");
const dotenv= require ("dotenv");
dotenv.config({path:"./config/config.env"});
const cookieParser= require("cookie-parser");
const connectDB= require("./config/db");
const mongoSanitize= require("express-mongo-sanitize");
const helmet= require("helmet");
const xss=require("xss-clean");
const rateLimit= require("express-rate-limit");
const hpp= require("hpp");
const cors= require("cors");
const ErrorHandler= require("./middlewares/errorHandler");


connectDB();

const reviewsRoute= require("./router/reviews.js");
const authRoute= require( "./router/auth.js");

const app= express();
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize()); 
app.use(helmet()); 
app.use(xss());

const limiter= rateLimit({
    windowMs: 10*60*1000,
    max: 100
})

app.use(limiter); 
app.use(hpp());
app.use(cors());
const PORT= process.env.PORT || 5000;

app.use("/api/v1/reviews", reviewsRoute);
app.use("/api/v1/auth", authRoute);
app.use(ErrorHandler);



app.listen (PORT, console.log(`server running in ${process.env.NODE_ENV} mode and port is ${PORT}`));


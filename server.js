const express= require("express");
const dotenv= require ("dotenv");

dotenv.config({path:"./config/config.env"});

const app= express();
const PORT= process.env.PORT || 5000;

let data= [
    {name:"Intrasteller", genre:"science fiction"},
    {name:"Arthur", genre:"mythology"},
    {name:"The Dark Knight", genre:"drama"}
]


app.get("/api/v1/reviews", (req,res)=> {
    res.status(200).json({success:true, data:data})
})

app.post("/api/v1/reviews", (req,res)=> {
    res.status(200).json({success:true, message:"your movie review is created"})
})

app.put("/api/v1/reviews/:id", (req,res)=> {
    res.status(200).json({success:true, message:`your movie review ${req.params.id} is updated`})
})

app.delete("/api/v1/reviews/:id", (req,res)=> {
    res.status(200).json({success:true, message:`your movie review ${req.params.id} is deleted`})
})


app.listen (PORT, console.log(`server running in ${process.env.NODE_ENV} mode and port is ${PORT}`));


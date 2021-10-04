const express= require("express");
const router= express.Router();

let data= [
    {name:"Intrasteller", genre:"science fiction"},
    {name:"Arthur", genre:"mythology"},
    {name:"The Dark Knight", genre:"drama"}
]


router.get("/", (req,res)=> {
    res.status(200).json({success:true, data:data})
})

router.post("/", (req,res)=> {
    res.status(200).json({success:true, message:"your movie review is created"})
})

router.put("/:id", (req,res)=> {
    res.status(200).json({success:true, message:`your movie review ${req.params.id} is updated`})
})

router.delete("/:id", (req,res)=> {
    res.status(200).json({success:true, message:`your movie review ${req.params.id} is deleted`})
})



module.exports= router;
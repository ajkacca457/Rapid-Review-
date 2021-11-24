const mongoose=require("mongoose");
const slugify=require("slugify");


const ReviewSchema= new mongoose.Schema({

title : {
     type: String,
    required:[true, "please add name of the review" ],
    unique:true,
    trim:true,
    maxlength: [100, "Review title cannot be higher than 100 charachters"]
},
subtitle: {
type:String,
maxlength:[50, "subtitle cannot be more than 50 charachter long"]
},

slug: String,
description: {
    type: String,
    required:[true, "description cannot be empty"],
    
},
author: {
    type: String,
    required:[true, "a review needs an author"]
},
ratingType: {
    type:String,
    required:true,
    enum: [
        "positive",
        "negative",
        "average"
    ]

},
star: {
type:Number,
required:true
},

createdAt : {
    type:Date,
    default:Date.now
}


});

ReviewSchema.pre("save",function(next){
this.slug= slugify(this.title,{lower:true})
next()
})


module.exports= mongoose.model("Reviews", ReviewSchema); 
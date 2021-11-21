const mongoose= require("mongoose");

const UserSchema= new mongoose.Schema({
    name: {
        type:String,
        required:[true,"please add a name"]
    },
    email: {
        type:String,
        match: ["/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"],
        required: [true, "please add an email address"]
    },
    password: {
        type:String,
        required :[true,"please add a password"],
        minlength:6,
        maxlength: 30,
        select:false
    },
    resetPasswordToken : String,
    resetPasswordExpire: Date,
    createdAt: {
        type:Date,
        default: Date.now
    }
      
})


module.exports= mongoose.model("User", UserSchema);

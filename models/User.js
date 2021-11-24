const mongoose= require("mongoose");
const bcryptjs= require("bcryptjs");
const jsonwebtoken= require ("jsonwebtoken");

const UserSchema= new mongoose.Schema({
    name: {
        type:String,
        required:[true,"please add a name"]
    },
    email: {
        type:String,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
    "please add a valid email"],
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

//statics on class itself

UserSchema.pre("save", async function(next){
const salt= await bcryptjs.genSalt(10);
this.password= await bcryptjs.hash(this.password,salt);
} )

//methods(calls on instance of class)
UserSchema.methods.getSignedJwtToken= function() {
    return jsonwebtoken.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRE
    });
};

UserSchema.methods.matchPassword= async function (password) {
  return await bcryptjs.compare(password,this.password);  
}

module.exports= mongoose.model("User", UserSchema);

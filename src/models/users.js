const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    //Registration
    username: { type: String, required: true },
    email: {type:String, required:true, unique:true},
    password:{type:String,required:true},
    cpassword: {type:String, required:true},
    number: {type:String, required:true},
    bio:{type:String, required:true},
});

const Register = new mongoose.model("Register", userSchema);
module.exports=Register;
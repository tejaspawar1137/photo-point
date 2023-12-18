import mongoose, { Schema, model, models } from "mongoose";
const UserSchema = new mongoose.Schema({
   role:{
  type:String,
  default:"user",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone:{
    type: Number,
    required:true,
    unique: true,
  }, 
  password:{
    type: String,
    required:true, 
  }, 
  Date: {
    type: Date,
    default: Date.now(),
  },
});
const User = models.User || model("User", UserSchema);
export default User;
import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true, 
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});
const Review = models.Review || model("Review", ReviewSchema);
export default Review;

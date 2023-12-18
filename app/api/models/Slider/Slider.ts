import { Schema,models,model } from "mongoose";

const SliderSchema = new Schema({
  image: { type: String, required: true, trim: true },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const Slider = models.Slider || model("Slider", SliderSchema);

export default Slider;

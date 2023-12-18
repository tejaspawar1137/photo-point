import { Schema, models,model } from "mongoose";

const ImageRetouchSchema = new Schema({
  image: { type: String, required: true, trim: true },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const ImageRetouch = models.ImageRetouch || model("ImageRetouch", ImageRetouchSchema);

export default ImageRetouch;

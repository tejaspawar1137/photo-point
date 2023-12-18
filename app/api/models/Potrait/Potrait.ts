import { Schema, models,model } from "mongoose";

const PotraitSchema = new Schema({
  image: { type: String, required: true, trim: true },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const Potrait = models.Potrait || model("Potrait", PotraitSchema);
export default Potrait;

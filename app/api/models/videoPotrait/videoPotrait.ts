import { Schema, models,model } from "mongoose";

const videoPotraitSchema = new Schema({
  image: { type: String, required: true, trim: true },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const videoPotrait = models.videoPotrait || model("videoPotrait", videoPotraitSchema);
export default videoPotrait;

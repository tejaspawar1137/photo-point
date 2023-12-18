import { Schema, models,model } from "mongoose";

const videoCandidSchema = new Schema({
  image: { type: String, required: true, trim: true },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const videoCandid = models.videoCandid || model("videoCandid", videoCandidSchema);
export default videoCandid;

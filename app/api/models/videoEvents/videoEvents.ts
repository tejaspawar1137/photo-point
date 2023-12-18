import { Schema, models,model } from "mongoose";

const videoEventsSchema = new Schema({
  image: { type: String, required: true, trim: true },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const videoEvents = models.videoEvents || model("videoEvents", videoEventsSchema);
export default videoEvents;

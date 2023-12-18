import { Schema, models,model } from "mongoose";

const EventsSchema = new Schema({
  image: { type: String, required: true, trim: true },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const Events = models.Events || model("Events", EventsSchema);
export default Events;

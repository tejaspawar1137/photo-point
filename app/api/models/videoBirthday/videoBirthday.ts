import { Schema, models,model } from "mongoose";

const videoBirthdaySchema = new Schema({
  image: { type: String, required: true, trim: true },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const videoBirthday = models.videoBirthday || model("videoBirthday", videoBirthdaySchema);

export default videoBirthday;

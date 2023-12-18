import { Schema, models,model } from "mongoose";

const BirthdaySchema = new Schema({
  image: { type: String, required: true, trim: true },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const Birthday = models.Birthday || model("Birthday", BirthdaySchema);

export default Birthday;

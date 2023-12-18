import { Schema, models,model } from "mongoose";

const CandidSchema = new Schema({
  image: { type: String, required: true, trim: true },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const Candid = models.Candid || model("Candid", CandidSchema);
export default Candid;

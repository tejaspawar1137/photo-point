import { Schema, model } from 'mongoose';

const videoWeddingSchema = new Schema({
    image: {
      type: String,
      required: true
    },
    Date: {
      type: Date,
      default: Date.now(),
    },
})

const videoWedding = model('videoWedding', videoWeddingSchema);
export default videoWedding;
import { Schema, model } from 'mongoose';

const WeddingSchema = new Schema({
    image: {
      type: String,
      required: true
    },
    Date: {
      type: Date,
      default: Date.now(),
    },
})

const Wedding = model('Wedding', WeddingSchema);
export default Wedding;
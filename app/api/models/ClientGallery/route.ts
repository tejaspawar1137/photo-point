import { Schema, model, models } from "mongoose";

const ClientGallerySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password:{
    type:String,
    trim:true,
    required: true
  },
  link:{
    type:String,
    trim:true,
    required: true
  },
  images: [
    {
      url: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const ClientGallery = models.ClientGallery || model("ClientGallery", ClientGallerySchema);
export default ClientGallery;

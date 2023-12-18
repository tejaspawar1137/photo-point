import { Schema,model, models } from "mongoose";
 

const PhotoFolderSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
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
const PhotoFolder = models.PhotoFolder || model("PhotoFolder", PhotoFolderSchema);
export default PhotoFolder;

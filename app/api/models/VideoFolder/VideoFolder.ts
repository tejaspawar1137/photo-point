import { Schema,model, models } from "mongoose"; 

const VideoFolderSchema = new Schema({
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
const VideoFolder = models.VideoFolder || model("VideoFolder", VideoFolderSchema);
export default VideoFolder;

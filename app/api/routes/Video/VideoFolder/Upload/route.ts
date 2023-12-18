import { authMiddleware } from "@/app/api/middleware/AuthMiddleware";
import VideoFolder from "@/app/api/models/VideoFolder/VideoFolder";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};

export const PUT = async (req: NextRequest, res: Response) => {
  const isAuthenticated = await authMiddleware(req);
  if (isAuthenticated) {
    try {
      const reqBody = await req.json();
      const  { url } = reqBody;
      const id=req.url.split("id=")[1]
      const VideoFolderExists = await VideoFolder.findOne({  _id:id });
      if (!VideoFolderExists) {
        return NextResponse.json(
          { success: false, message: "Folder doesn't exist" },
          { status: 400 }
        );
      }
      // Initialize imageArray as an empty array if it is undefined
      let imageArray: ImageType[] = VideoFolderExists?.images; 
      if (imageArray.find((e) => e.url === url)) {
        return NextResponse.json(
          { success: false, message: "Video already exists" },
          { status: 200 }
        );
      }
      // Push the new url into the imageArray
      imageArray.push({ url: url });
      // Create or update the VideoFolder document
      const videoFolder = await VideoFolder.findOneAndUpdate(
        { _id: id },
        {  images: imageArray },
        { new: true, upsert: true }
      );

      // Do whatever you want
      return NextResponse.json(
        { success: true, videoFolder },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: (error as Error).message },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { success: false, message: "You don't have access to this resource" },
      { status: 400 }
    );
  }
};

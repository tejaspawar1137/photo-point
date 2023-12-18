import { authMiddleware } from "@/app/api/middleware/AuthMiddleware";
import VideoFolder from "@/app/api/models/VideoFolder/VideoFolder";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};

export async function PUT(req: NextRequest, res: Response) {
  const isAuthenticated = await authMiddleware(req);
  if(isAuthenticated){
    try {
      const reqBody = await req.json();
      const {  url } = reqBody;
      const id=req.url.split("id=")[1]
      const VideoFolderExists = await VideoFolder.find({ _id:id });
      let imageArray: ImageType[] = VideoFolderExists[0]?.images || [];
      const updatedImageArray = imageArray.filter((e) => e.url !== url); 
      const updatedVideoFolder = await VideoFolder.findOneAndUpdate(
        {  _id:id },
        {  images: updatedImageArray }
      );
      return NextResponse.json(
        { success: true, updatedVideoFolder },
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
  }

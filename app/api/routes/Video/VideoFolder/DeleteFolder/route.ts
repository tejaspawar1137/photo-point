import { authMiddleware } from "@/app/api/middleware/AuthMiddleware";
import VideoFolder from "@/app/api/models/VideoFolder/VideoFolder";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};

export async function PUT(req: NextRequest, res: Response) { 
    try { 
      const id=req.url.split("id=")[1];
      const VideoFolderExists = await VideoFolder.findOne({  _id:id });
      if (!VideoFolderExists) {
        return NextResponse.json(
          { success: false, message: "Folder does not exist." },
          { status: 400 }
        );
      }
      const updatedVideoFolder = await VideoFolder.findOneAndDelete({
       _id:id
      });
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
}

 
import connectToDB from "@/app/api/Db";
import VideoFolder from "@/app/api/models/VideoFolder/VideoFolder";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};

export async function PUT(req: NextRequest, res: Response) { 
    try {
      await connectToDB();
      const id=req.url.split("id=")[1]
      const reqBody = await req.json();
      const { name } = reqBody;
      const VideoFolderExists = await VideoFolder.findOne({ _id: id });
      if (!VideoFolderExists) {
        return NextResponse.json(
          { success: false, message: "Folder does not exist." },
          { status: 400 }
        );
      }
    VideoFolderExists.name=name;
    const updatedVideoFolder =await VideoFolderExists.save(); 
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

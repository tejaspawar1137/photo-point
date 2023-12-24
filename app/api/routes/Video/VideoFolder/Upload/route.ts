 
import connectToDB from "@/app/api/Db";
import VideoFolder from "@/app/api/models/VideoFolder/VideoFolder";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};

export const dynamic = 'force-dynamic';
export const PUT = async (req: NextRequest, res: Response) => { 
    try {
      await connectToDB();
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
      let imageArray: ImageType[] = VideoFolderExists?.images; 
      if (imageArray.find((e) => e.url === url)) {
        return NextResponse.json(
          { success: false, message: "Video already exists" },
          { status: 200 }
        );
      } 
      imageArray.push({ url: url }); 
      const videoFolder = await VideoFolder.findOneAndUpdate(
        { _id: id },
        {  images: imageArray },
        { new: true, upsert: true }
      ); 
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
};

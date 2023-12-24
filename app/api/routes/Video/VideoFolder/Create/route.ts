 
import connectToDB from "@/app/api/Db";
import VideoFolder from "@/app/api/models/VideoFolder/VideoFolder";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};

export const POST = async (req: NextRequest, res: Response) => { 
    try {
      await connectToDB();
      const reqBody = await req.json();
      const { name, url } = reqBody;
      const VideoFolderExists = await VideoFolder.findOne({ name: name  });
      if (VideoFolderExists) {
        return NextResponse.json(
          { success: false, message: "Folder already exists." },
          { status: 400 }
        );
      }
      // Initialize imageArray as an empty array if it is undefined
      let imageArray: ImageType[] = [];

      imageArray.push({ url: url });
      // Create or update the VideoFolder document
      const videoFolder = await VideoFolder.create({
        name: name,
        images: imageArray,
      });

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
};

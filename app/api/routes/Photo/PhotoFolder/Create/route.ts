import connectToDB from "@/app/api/Db"; 
import PhotoFolder from "@/app/api/models/PhotoFolder/PhotoFolder";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};

export const POST = async (req: NextRequest, res: Response) => { 
    try {
      await connectToDB();
      const reqBody = await req.json();
      const { name, url } = reqBody;
      const PhotoFolderExists = await PhotoFolder.findOne({ name: name  });
      if (PhotoFolderExists) {
        return NextResponse.json(
          { success: false, message: "Folder already exists." },
          { status: 400 }
        );
      }
      // Initialize imageArray as an empty array if it is undefined
      let imageArray: ImageType[] = [];

      imageArray.push({ url: url });
      // Create or update the PhotoFolder document
      const photoFolder = await PhotoFolder.create({
        name: name,
        images: imageArray,
      });

      // Do whatever you want
      return NextResponse.json(
        { success: true, photoFolder },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: (error as Error).message },
        { status: 400 }
      );
    } 
};

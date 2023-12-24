 
import connectToDB from "@/app/api/Db";
import PhotoFolder from "@/app/api/models/PhotoFolder/PhotoFolder";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};

export const PUT = async (req: NextRequest, res: Response) => { 
    try {
      const reqBody = await req.json();
      const {url} = reqBody;
      const id=req.url.split("id=")[1]
      const PhotoFolderExists = await PhotoFolder.findOne({_id:id });
      if (!PhotoFolderExists) {
        return NextResponse.json(
          { success: false, message: "Folder doesn't exist" },
          { status: 400 }
        );
      }
      // Initialize imageArray as an empty array if it is undefined
      let imageArray: ImageType[] = PhotoFolderExists?.images; 
      if (imageArray.find((e) => e.url === url)) {
        return NextResponse.json(
          { success: false, message: "Image already exists" },
          { status: 200 }
        );
      }
      // Push the new url into the imageArray
      imageArray.push({ url: url });
      // Create or update the PhotoFolder document
      const photoFolder = await PhotoFolder.findOneAndUpdate(
        {_id:id },
        {  images: imageArray },
        { new: true, upsert: true }
      );

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

connectToDB();
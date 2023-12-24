import { authMiddleware } from "@/app/api/middleware/AuthMiddleware";
import PhotoFolder from "@/app/api/models/PhotoFolder/PhotoFolder";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};

export async function PUT(req: NextRequest, res: Response) { 
    try {
      const reqBody = await req.json();
      const {  url } = reqBody;
      const id=req.url.split("id=")[1]
      const PhotoFolderExists = await PhotoFolder.find({ _id:id });
      let imageArray: ImageType[] = PhotoFolderExists[0]?.images || [];
      const updatedImageArray = imageArray.filter((e) => e.url !== url); 
      const updatedPhotoFolder = await PhotoFolder.findOneAndUpdate(
        {  _id:id },
        {   images: updatedImageArray }
      );
      return NextResponse.json(
        { success: true, updatedPhotoFolder },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: (error as Error).message },
        { status: 400 }
      );
    } 
  }

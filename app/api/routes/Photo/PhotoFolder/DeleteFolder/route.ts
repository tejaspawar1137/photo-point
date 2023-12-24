import connectToDB from "@/app/api/Db"; 
import PhotoFolder from "@/app/api/models/PhotoFolder/PhotoFolder";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};

export async function PUT(req: NextRequest, res: Response) { 
    try { 
      await connectToDB();
      const id=req.url.split("id=")[1];
      const PhotoFolderExists = await PhotoFolder.find({ _id:id });
      if (!PhotoFolderExists) {
        return NextResponse.json(
          { success: false, message: "Folder does not exist." },
          { status: 400 }
        );
      }
      const updatedPhotoFolder = await PhotoFolder.findOneAndDelete({
       _id:id
      });
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

connectToDB();
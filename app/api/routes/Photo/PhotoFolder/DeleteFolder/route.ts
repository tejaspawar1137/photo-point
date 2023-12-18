import connectToDB from "@/app/api/Db";
import { authMiddleware } from "@/app/api/middleware/AuthMiddleware";
import PhotoFolder from "@/app/api/models/PhotoFolder/PhotoFolder";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};

export async function PUT(req: NextRequest, res: Response) {
  const isAuthenticated = await authMiddleware(req);
  if (isAuthenticated) {
    try { 
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
  } else {
    return NextResponse.json(
      { success: false, message: "You don't have access to this resource" },
      { status: 400 }
    );
  }
}

connectToDB();
import { authMiddleware } from "@/app/api/middleware/AuthMiddleware";
import ClientGallery from "@/app/api/models/ClientGallery/ClientGallery";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};

export async function PUT(req: NextRequest, res: Response) {
  const isAuthenticated = await authMiddleware(req);
  if (isAuthenticated) {
    try { 
      const reqBody = await req.json();
      const { name,link } = reqBody;
      const id=req.url.split("id=")[1]
      const clientGalleryExists = await ClientGallery.find({ _id: id });
      if (!clientGalleryExists) {
        return NextResponse.json(
          { success: false, message: "Client Gallery does not exist." },
          { status: 400 }
        );
      }
      const updatedClientGallery = await ClientGallery.findOneAndUpdate(
        { _id: id },
        { name: name,link:link }
      );
      return NextResponse.json(
        { success: true, updatedClientGallery },
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

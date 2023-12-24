import connectToDB from "@/app/api/Db"; 
import ClientGallery from "@/app/api/models/ClientGallery/ClientGallery";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};

export const dynamic = 'force-dynamic';
export async function PUT(req: NextRequest, res: Response) { 
    try { 
      await connectToDB();
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
}

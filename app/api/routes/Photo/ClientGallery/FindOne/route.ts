import ClientGallery from "@/app/api/models/ClientGallery/route";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest, res: Response) => {  
    try { 
      const id=req.url.split("id=")[1]
      const clientGalleryExists = await ClientGallery.findOne({_id:id });
      if (!clientGalleryExists) {
        return NextResponse.json(
          { success: false, message: "Client Gallery doesn't exist" },
          { status: 400 }
        );
      }
      // Do whatever you want
      return NextResponse.json(
        { success: true, clientGalleryExists },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: (error as Error).message },
        { status: 400 }
      );
    }
  
};

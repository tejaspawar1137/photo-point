import connectToDB from "@/app/api/Db";
import ClientGallery from "@/app/api/models/ClientGallery/ClientGallery";
import { NextRequest, NextResponse } from "next/server";

function getUrlParam(url:string, param:any) {
  const urlSearchParams = new URLSearchParams(new URL(url).search);
  return urlSearchParams.get(param);
}

export const dynamic = 'force-dynamic';
export const GET = async (req: NextRequest, res: Response) => {  
    try { 
      await connectToDB();
       const queryUrl=req.url;   
      const id = getUrlParam(queryUrl, 'id'); 
      const clientGalleryExists = await ClientGallery.findOne({_id:id });
      if (!clientGalleryExists) {
        return NextResponse.json(
          { success: false, message: "Client Gallery doesn't exist" },
          { status: 400 }
        );
      }
      // Do whatever you want
      return NextResponse.json(
        {  success: true, clientGalleryExists },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: (error as Error).message },
        { status: 400 }
      );
    }
  
};

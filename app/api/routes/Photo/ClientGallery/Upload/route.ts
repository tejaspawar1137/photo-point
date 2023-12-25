 
import connectToDB from "@/app/api/Db";
import ClientGallery from "@/app/api/models/ClientGallery/ClientGallery";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};
function getUrlParam(url:string, param:any) {
  const urlSearchParams = new URLSearchParams(new URL(url).search);
  return urlSearchParams.get(param);
}
export const dynamic = 'force-dynamic';
export const PUT = async (req: NextRequest, res: Response) => { 
    try {
      await connectToDB();
       const queryUrl=req.url;   
      const id = getUrlParam(queryUrl, 'id');
      const reqBody = await req.json();
      const {  url } = reqBody;
      const clientGalleryExists = await ClientGallery.findOne({_id:id });
      if (!clientGalleryExists) {
        return NextResponse.json(
          { success: false, message: "Client Gallery doesn't exist" },
          { status: 400 }
        );
      }
      // Initialize imageArray as an empty array if it is undefined
      let imageArray: ImageType[] = clientGalleryExists?.images; 
      if (imageArray.find((e) => e.url === url)) {
        return NextResponse.json(
          { success: false, message: "Image already exists" },
          { status: 200 }
        );
      }
      // Push the new url into the imageArray
      imageArray.push({ url: url }); 
      clientGalleryExists.images=imageArray;
      const clientGallery=await clientGalleryExists.save();
      
  
      // Do whatever you want
      return NextResponse.json(
        { success: true, clientGallery },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: (error as Error).message },
        { status: 400 }
      );
    } 
};

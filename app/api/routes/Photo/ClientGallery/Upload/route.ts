import { authMiddleware } from "@/app/api/middleware/AuthMiddleware";
import ClientGallery from "@/app/api/models/ClientGallery/ClientGallery";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};

export const PUT = async (req: NextRequest, res: Response) => {
  const isAuthenticated = await authMiddleware(req);
  if (isAuthenticated) {
    try {
      const reqBody = await req.json();
      const {  url } = reqBody;
      const id=req.url.split("id=")[1]
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
  } else {
    return NextResponse.json(
      { success: false, message: "You don't have access to this resource" },
      { status: 400 }
    );
  }
};

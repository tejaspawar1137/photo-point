import { authMiddleware } from "@/app/api/middleware/AuthMiddleware";
import ClientGallery from "@/app/api/models/ClientGallery/ClientGallery";
import { NextRequest, NextResponse } from "next/server";

export type ImageType = {
  url: string;
};

export const POST = async (req: NextRequest, res: Response) => { 
    try {
      const reqBody = await req.json();
      const { name, url,password,link } = reqBody;
      const clientGalleryExists = await ClientGallery.findOne({name:name});
      if (clientGalleryExists) {
        return NextResponse.json(
          { success: false, message: "Client Gallery already exists" },
          { status: 400 }
        );
      }
      // Initialize imageArray as an empty array if it is undefined
      let imageArray: ImageType[] = [];

      imageArray.push({ url: url });
 
      // Create or update the ClientGallery document
      const clientGallery = await ClientGallery.create({
        name:name,
        images: imageArray,
        password:password,
        link:link
      });

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

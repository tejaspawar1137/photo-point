import { authMiddleware } from "@/app/api/middleware/AuthMiddleware";
import videoEvents from "@/app/api/models/videoEvents/videoEvents";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: Response) {
  const isAuthenticated = await authMiddleware(req);
  if (isAuthenticated) {
    try {
      const reqBody = await req.json();
      const { image } = reqBody;
      const imageExists = await videoEvents.findOne({ image: image });
      if (imageExists) {
        return NextResponse.json(
          { success: false, message: "Image already exists" },
          { status: 400 }
        );
      }
      const CreatedVideoEvents = await videoEvents.create({ image: image });
      // Do whatever you want
      return NextResponse.json(
        { success: true, CreatedVideoEvents },
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

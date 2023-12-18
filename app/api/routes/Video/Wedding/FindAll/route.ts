import videoWedding from "@/app/api/models/videoWedding/videoWedding";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const VideoWedding = await videoWedding.find();
    // Do whatever you want
    return NextResponse.json({ success: true, VideoWedding }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

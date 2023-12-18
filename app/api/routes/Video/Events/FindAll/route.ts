import videoEvents from "@/app/api/models/videoEvents/videoEvents";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const VideoEvents = await videoEvents.find();
    // Do whatever you want
    return NextResponse.json({ success: true, VideoEvents }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

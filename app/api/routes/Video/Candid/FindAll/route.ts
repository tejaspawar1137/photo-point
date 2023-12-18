import videoCandid from "@/app/api/models/videoCandid/videoCandid";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const VideoCandid = await videoCandid.find();
    // Do whatever you want
    return NextResponse.json({ success: true, VideoCandid }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

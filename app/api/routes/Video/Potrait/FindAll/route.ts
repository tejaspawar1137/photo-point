import videoPotrait from "@/app/api/models/videoPotrait/videoPotrait";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const VideoPotrait = await videoPotrait.find();
    // Do whatever you want
    return NextResponse.json({ success: true, VideoPotrait }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

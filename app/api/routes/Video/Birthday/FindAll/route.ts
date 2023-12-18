import videoBirthday from "@/app/api/models/videoBirthday/videoBirthday";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const VideoBirthday = await videoBirthday.find();
    // Do whatever you want
    return NextResponse.json({ success: true, VideoBirthday }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

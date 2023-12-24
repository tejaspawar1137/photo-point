import connectToDB from "@/app/api/Db";
import Slider from "@/app/api/models/Slider/Slider";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(req: Request, res: Response) {
  try {
    await connectToDB();
    const slider = await Slider.find();
    // Do whatever you slider
    return NextResponse.json({ success: true, slider }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

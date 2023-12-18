import Slider from "@/app/api/models/Slider/Slider";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
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

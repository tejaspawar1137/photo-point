import ImageRetouch from "@/app/api/models/ImageRetouch/ImageRetouch";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const imageRetouch = await ImageRetouch.find();
    // Do whatever you want
    return NextResponse.json({ success: true, imageRetouch }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

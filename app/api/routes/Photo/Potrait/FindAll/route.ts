import Potrait from "@/app/api/models/Potrait/Potrait";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const potrait = await Potrait.find();
    // Do whatever you want
    return NextResponse.json({ success: true, potrait }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

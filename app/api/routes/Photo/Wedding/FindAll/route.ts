import Wedding from "@/app/api/models/Wedding/Wedding";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const wedding = await Wedding.find();
    // Do whatever you want
    return NextResponse.json({ success: true, wedding }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

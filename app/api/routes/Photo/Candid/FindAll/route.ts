import Candid from "@/app/api/models/Candid/Candid";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const candid = await Candid.find();
    // Do whatever you want
    return NextResponse.json({ success: true, candid }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

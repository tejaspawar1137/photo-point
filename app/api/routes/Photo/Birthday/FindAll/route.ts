import Birthday from "@/app/api/models/Birthday/Birthday";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const birthday = await Birthday.find(); 
    // Do whatever you want
    return NextResponse.json({ success: true, birthday }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

import Events from "@/app/api/models/Events/Events";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const events = await Events.find();
    // Do whatever you want
    return NextResponse.json({ success: true, events }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

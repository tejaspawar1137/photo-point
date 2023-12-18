import Review from "@/app/api/models/Review/Review";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const review = await Review.find();
    // Do whatever you want
    return NextResponse.json({ success: true, review }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

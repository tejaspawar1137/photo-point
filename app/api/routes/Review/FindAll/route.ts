import connectToDB from "@/app/api/Db";
import Review from "@/app/api/models/Review/Review";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(req: Request, res: Response) {
  try {
    await connectToDB();
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

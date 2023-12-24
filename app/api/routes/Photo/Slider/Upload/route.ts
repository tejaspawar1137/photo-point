 
import connectToDB from "@/app/api/Db";
import Slider from "@/app/api/models/Slider/Slider";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest, res: Response) { 
    try {
      await connectToDB();
      const reqBody = await req.json();
      const { image } = reqBody;
      const imageExists = await Slider.findOne({ image: image });
      if (imageExists) {
        return NextResponse.json(
          { success: false, message: "Image already exists" },
          { status: 400 }
        );
      }
      const slider = await Slider.create({ image: image });
      // Do whatever you want
      return NextResponse.json({ success: true, slider }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: (error as Error).message },
        { status: 400 }
      );
    }
  } 

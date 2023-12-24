import connectToDB from "@/app/api/Db";
import PhotoFolder from "@/app/api/models/PhotoFolder/PhotoFolder";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(req: Request, res: Response) {
  try {
    console.log("req hit")
    await connectToDB();
    console.log("db hit")
    const photoFolder = await PhotoFolder.find();
    console.log("PhotoFolder hit",photoFolder);
    return NextResponse.json({ success: true, photoFolder }, { status: 200 });
  } catch (error) {; 
    console.log("Err hitting dat ass");
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}
  
connectToDB();
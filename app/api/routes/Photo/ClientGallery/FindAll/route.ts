import connectToDB from "@/app/api/Db";
import ClientGallery from "@/app/api/models/ClientGallery/ClientGallery";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET(req: Request, res: Response) {
    try {
        await connectToDB();
        const clientGallery = await ClientGallery.find();
        // Do whatever you want
        return NextResponse.json({ success: true, clientGallery }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 400 });
    }
}

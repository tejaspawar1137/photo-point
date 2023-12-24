import connectToDB from '@/app/api/Db';
import VideoFolder from '@/app/api/models/VideoFolder/VideoFolder';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
    try {
        await connectToDB();
        const videoFolder = await VideoFolder.find();
        // Do whatever you want
        return NextResponse.json({ success: true, videoFolder }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 400 });
    }
}

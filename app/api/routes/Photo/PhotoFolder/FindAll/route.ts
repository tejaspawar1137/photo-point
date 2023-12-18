import connectToDB from '@/app/api/Db';
import PhotoFolder from '@/app/api/models/PhotoFolder/PhotoFolder';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
    try {
        const photoFolder = await PhotoFolder.find();
        // Do whatever you want
        return NextResponse.json({ success: true, photoFolder }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 400 });
    }
}

connectToDB();
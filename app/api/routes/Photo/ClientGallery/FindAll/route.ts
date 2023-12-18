import ClientGallery from '@/app/api/models/ClientGallery/route';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
    try {
        const clientGallery = await ClientGallery.find();
        // Do whatever you want
        return NextResponse.json({ success: true, clientGallery }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 400 });
    }
}

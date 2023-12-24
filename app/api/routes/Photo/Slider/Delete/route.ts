 
import connectToDB from '@/app/api/Db';
import Slider from '@/app/api/models/Slider/Slider';
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';
export async function DELETE(req: NextRequest,res:Response) { 
    try {
        await connectToDB();
        const reqBody = await req.json();
        const {image} = reqBody;
        const imageExists=await Slider.findOne({image:image})
        if(imageExists){
        await Slider.findOneAndDelete({image:image})
        return NextResponse.json({ success: true},{ status: 200 })
        }else{
         return NextResponse.json({ success: false,message:"Image doesn't exist"}, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ success: false,message: (error as Error).message}, { status: 400 })
    }
  }

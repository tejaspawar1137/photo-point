import { NextResponse, NextRequest } from "next/server";
import Review from "@/app/api/models/Review/Review";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { name,email, message, rating } = reqBody; 
    const isReview = await Review.findOne({ email: email });
    if (isReview) {
      return NextResponse.json(
        { message: "Review already exits" },
        { status: 400 }
      );
    }
    const review = await Review.create({
      name,
      message,
      rating,
      email
    });

    if (!review) {
      return NextResponse.json({
        message: "Error creating Review",
        success: false,
      });
    }
    return NextResponse.json({ message: "success", review }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 500,
        }
      );
    }
  }
};

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";
export async function POST(req: Request, res: Response) {
  try {
    const reqBody = await req.json();
    const { formData } = reqBody;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sharmaaniket682@gmail.com",
        pass: "oyso hcia jpmg rahc",
      },
    });

    // Setup email data
    const mailOptions = {
      from: formData.email,
      to: "sharmaaniket682@gmail.com",
      subject: "Dheeraj Photo Point: New Inquiry",
      html: `<p>Name: ${formData.name}</p>
           <p>Email: ${formData.email}</p>
           <p>Phone: ${formData.phoneNumber}</p>
           <p>Message: ${formData.message}</p>`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to send email, please try again." },
      { status: 500 }
    );
  }
}

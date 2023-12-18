import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request, res: Response) {
  try {
    const reqBody = await req.json();
    const { name, email, phone, message } = reqBody;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user :"sharmaaniket682@gmail.com",
        pass :"oyso hcia jpmg rahc"
      },
    });

    // Setup email data
    const mailOptions = {
      from: email,
      to: "sharmaaniket682@gmail.com",
      subject: "Dheeraj Photo Point: New Inquiry",
      html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to send email, please try again." },
      { status: 500 }
    );
  }
}
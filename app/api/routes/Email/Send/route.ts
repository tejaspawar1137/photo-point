import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";
export async function POST(req: Request, res: Response) {
  try {
    const email="dheerajstudio96@gmail.com" 
    const reqBody = await req.json();
    const { formData } = reqBody;
 
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${email}`,
        pass: "sstb vejn ytjt liqc",
      },
    });
 
    const mailOptions = {
      from: formData.email,
      to: `${email}`,
      subject: "Dheeraj Photo Point: New Inquiry",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <h2 style="color: #333;">New Inquiry for Dheeraj Photo Point</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phoneNumber}</p>
          <p><strong>Message:</strong> ${formData.message}</p>
        </div>
      `,
    };
 
   await transporter.sendMail(mailOptions);
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

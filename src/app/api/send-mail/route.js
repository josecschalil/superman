import nodemailer from "nodemailer";
export async function POST(request) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials not configured");
    }

    const { name, email, subject, message, category } = await request.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Decorno Contact" <${process.env.EMAIL_USER}>`,
      to: "josecschalil2101@gmail.com",
      subject: `${subject} (${category})`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Detailed error:", {
      error: error.message,
      credentialsConfigured:
        !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS,
      envKeys: Object.keys(process.env).filter((k) => k.includes("EMAIL")),
    });

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
// Optionally add other HTTP methods
export async function GET() {
  return new Response(JSON.stringify({ message: "Method not allowed" }), {
    status: 405,
  });
}

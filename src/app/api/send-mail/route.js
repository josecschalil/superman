import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    // Validate email credentials
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials not configured");
    }

    const requestData = await request.json();
    const { type } = requestData;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions;
    let responseMessage;

    // Handle different email types
    switch (type) {
      case "contact":
        const { name, email, subject, message, category } = requestData;
        mailOptions = {
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
            <p>${(message || "").replace(/\n/g, "<br>")}</p>
          `,
        };
        responseMessage = "Contact form submitted successfully";
        break;

      case "download":
        const { downloadLink, fileName, recipientEmail } = requestData;
        if (!downloadLink) {
          throw new Error("Download link is required");
        }

        mailOptions = {
          from: `"Decorno Downloads" <${process.env.EMAIL_USER}>`,
          to: recipientEmail || "josecschalil2101@gmail.com",
          subject: `Your Download: ${fileName || "Preset Pack"}`,
          text: `Here's your download link: ${downloadLink}`,
          html: `
            <h2>Thank you for your purchase!</h2>
            <p>Your download is ready:</p>
            <a href="${downloadLink}" style="
              display: inline-block;
              padding: 10px 20px;
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 10px 0;
            ">Download ${fileName || "Preset Pack"}</a>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't request this, please ignore this email.</p>
          `,
        };
        responseMessage = "Download link sent successfully";
        break;

      default:
        throw new Error("Invalid email type specified");
    }

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({
        success: true,
        message: responseMessage,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Email sending error:", {
      error: error.message,
      requestBody: await request.json().catch(() => "Unable to parse request"),
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
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({
      message: "Method not allowed",
      allowedMethods: ["POST"],
    }),
    {
      status: 405,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

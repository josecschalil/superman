import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Email validation helper
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET() {
  try {
    const downloads = await prisma.Downloads.findMany({
      select: {
        id: true,
        email: true,
        presetId: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(downloads, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching Link:", error);
    return NextResponse.json(
      { error: "Failed to fetch playlist records" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request) {
  try {
    // Content-Type check
    const contentType = request.headers.get("content-type");
    if (contentType !== "application/json") {
      return NextResponse.json(
        { error: "Invalid content type. Expected application/json" },
        { status: 415, headers: corsHeaders }
      );
    }

    const data = await request.json();

    // Validate required fields
    const requiredFields = ["email", "presetId"];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          missingFields,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate email format
    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Create record
    const download = await prisma.Downloads.create({
      data: {
        email: data.email,
        presetId: data.presetId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: download,
      },
      {
        status: 201,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Download log creation error:", error);

    // Handle Prisma specific errors
    if (error.code === "P2002") {
      // Unique constraint violation
      return NextResponse.json(
        { error: "Download record already exists" },
        { status: 409, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create download log",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

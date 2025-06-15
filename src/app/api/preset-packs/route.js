import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// GET - Fetch all active preset packs
export async function GET() {
  try {
    const presetPack = await prisma.presetPack.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        subtitle: true,
        description: true,
        price: true,
        discountedPrice: true,
        thumbnailLink: true,
        createdAt: true,
      },
    });

    return NextResponse.json(presetPack, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching preset packs:", error);
    return NextResponse.json(
      { error: "Failed to fetch preset packs", details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST - Create new preset pack
export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type. Expected application/json" },
        { status: 415, headers: corsHeaders }
      );
    }

    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "subtitle",
      "description",
      "price",
      "downloadLink",
      "thumbnailLink",
    ];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          missingFields: missingFields,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate price format
    if (isNaN(parseFloat(data.price))) {
      return NextResponse.json(
        { error: "Price must be a valid number" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Create preset pack
    const presetPack = await prisma.presetPack.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        imageLink1: data.imageLink1 || null,
        imageLink2: data.imageLink2 || null,
        imageLink3: data.imageLink3 || null,
        imageLink4: data.imageLink4 || null,
        price: parseFloat(data.price),
        discountedPrice: data.discountedPrice
          ? parseFloat(data.discountedPrice)
          : null,
        downloadLink: data.downloadLink,
        thumbnailLink: data.thumbnailLink,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: presetPack,
      },
      {
        status: 201,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Error creating preset pack:", error);
    return NextResponse.json(
      {
        error: "Failed to create preset pack",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// OPTIONS - For CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

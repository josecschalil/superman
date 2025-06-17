import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    // Await the params object before accessing its properties
    const { id } = await params;

    const presetPack = await prisma.presetPack.findUnique({
      where: { id: id }, // or parseInt(id) if ID is a number
    });

    if (!presetPack) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(presetPack);
  } catch (error) {
    console.error("Error fetching preset pack:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
// PUT - Update preset pack
export async function PUT(request, { params }) {
  try {
    const data = await request.json();

    // Optional: Add basic validation
    if (!data.title || !data.price) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const presetPack = await prisma.presetPack.update({
      where: { id: params.id },
      data: {
        ...data,
        price: data.price ? parseFloat(data.price) : undefined,
        discountedPrice: data.discountedPrice
          ? parseFloat(data.discountedPrice)
          : null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(presetPack);
  } catch (error) {
    console.error("Error updating preset pack:", error);
    return NextResponse.json(
      { error: "Failed to update preset pack" },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete preset pack
export async function DELETE(_, { params }) {
  try {
    const presetPack = await prisma.presetPack.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json({ message: "Preset pack deleted successfully" });
  } catch (error) {
    console.error("Error deleting preset pack:", error);
    return NextResponse.json(
      { error: "Failed to delete preset pack" },
      { status: 500 }
    );
  }
}

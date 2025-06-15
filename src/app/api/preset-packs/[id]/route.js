import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request, { params }) {
  try {
    const presetPack = await prisma.presetPack.findUnique({
      where: { id: params.id },
    });

    if (!presetPack) {
      return NextResponse.json(
        { error: "Preset pack not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(presetPack);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch preset pack" },
      { status: 500 }
    );
  }
}

// PUT - Update preset pack
export async function PUT(request, { params }) {
  try {
    const data = await request.json();

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
    return NextResponse.json(
      { error: "Failed to update preset pack" },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete preset pack
export async function DELETE(request, { params }) {
  try {
    const presetPack = await prisma.presetPack.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json({ message: "Preset pack deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete preset pack" },
      { status: 500 }
    );
  }
}

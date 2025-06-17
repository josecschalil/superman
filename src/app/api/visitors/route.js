// app/api/visitors/route.js
import { incrementVisitorCount, getVisitorCount } from "@/lib/visitorUtils";

export async function POST() {
  try {
    const count = await incrementVisitorCount();
    return Response.json({ success: true, count });
  } catch (error) {
    console.error("Error incrementing count:", error);
    return Response.json(
      { success: false, error: "Failed to update counter" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await getVisitorCount();
    return Response.json({ success: true, count });
  } catch (error) {
    console.error("Error getting count:", error);
    return Response.json(
      { success: false, error: "Failed to get visitor count" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getPrivateMoments } from "@/lib/actions";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const password = request.headers.get("x-private-password");
    if (!password) {
      return NextResponse.json(
        { error: "Password required" },
        { status: 401 }
      );
    }

    const moments = await getPrivateMoments(password);
    return NextResponse.json(moments);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }
    console.error("Failed to fetch private moments:", error);
    return NextResponse.json(
      { error: "Failed to fetch private moments" },
      { status: 500 }
    );
  }
}

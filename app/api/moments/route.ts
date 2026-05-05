import { NextResponse } from "next/server";
import { z } from "zod";
import { createMoment, getPublicMoments } from "@/lib/actions";

const createMomentSchema = z.object({
  content: z.string().min(1).max(200),
  category: z.enum(["social", "food", "explore", "creative", "health", "learning", "custom"]),
  source: z.enum(["recommended", "custom"]).default("custom"),
  is_public: z.boolean().default(true),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month") ?? undefined;
    const moments = await getPublicMoments(month);
    return NextResponse.json(moments);
  } catch (error) {
    console.error("Failed to fetch moments:", error);
    return NextResponse.json(
      { error: "Failed to fetch moments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createMomentSchema.parse(body);

    const moment = await createMoment({
      content: parsed.content,
      category: parsed.category,
      source: parsed.source,
      is_public: parsed.is_public ? 1 : 0,
      completed_at: new Date().toISOString(),
    });

    return NextResponse.json(moment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Failed to create moment:", error);
    return NextResponse.json(
      { error: "Failed to create moment" },
      { status: 500 }
    );
  }
}

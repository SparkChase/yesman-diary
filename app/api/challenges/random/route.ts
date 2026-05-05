import { NextResponse } from "next/server";
import challenges from "@/data/challenges";

export async function GET() {
  const randomIndex = Math.floor(Math.random() * challenges.length);
  const challenge = challenges[randomIndex];
  return NextResponse.json(challenge);
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const access = (await cookies()).get("accessToken")?.value;
  return NextResponse.json({ authenticated: Boolean(access) });
}
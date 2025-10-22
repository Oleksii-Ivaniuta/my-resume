import { NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  try {
    const sessionId = cookieStore.get("sessionId")?.value;

    await api.post("auth/logout", null, {
      headers: {
        Cookie: `refreshToken=${sessionId}`,
      },
    });

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("sessionId");

    return NextResponse.json({ status: 200, message: "Logged out successfully" });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
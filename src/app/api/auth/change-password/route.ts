import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
  return NextResponse.json(
      { error: "No acces token" },
      { status: 401 }
    );
}
  try {
    const apiRes = await api.post("/change-password", body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json({ ok: true, message: apiRes.data.message });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error)?.message ?? "Server error" },
      { status: 500 }
    );
  }
}

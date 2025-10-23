import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";


export async function POST(req: NextRequest) {
  const body = await req.json();
   try {
    const apiRes = await api.post("auth/change-password", body);
    return NextResponse.json({ status: 200, message: apiRes.data.message });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error)?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
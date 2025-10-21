import { getEnvVar } from "@/app/utils/getEnvVar";
import { ENV_VARS } from "@/constants/envVars";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";

export async function POST(req: NextRequest) {
    const token = getEnvVar(ENV_VARS.MAIL_TOKEN);
    const body = await req.json();
    try {
        const apiRes = await api.post('/send-mail', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
        });
        return NextResponse.json({ ok: true, message: apiRes.data.message });
    }
    catch (e) {
    return NextResponse.json(
      { error: (e as Error)?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
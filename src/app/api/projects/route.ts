import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { cookies } from "next/headers";
import FormData from "form-data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const params: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    const apiRes = await api.get("/projects", { params });
    return NextResponse.json(apiRes.data);
  } catch (e) {
    console.error("GET /projects error:", e);
    return NextResponse.json(
      { error: (e as Error)?.message ?? "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken)
    return NextResponse.json({ error: "No access token" }, { status: 401 });

  try {
    const form = await req.formData();

    const nodeForm = new FormData();
    for (const [key, value] of form.entries()) {
      if (value instanceof File) {
        const buf = Buffer.from(await value.arrayBuffer());
        nodeForm.append(key, buf, {
          filename: value.name,
          contentType: value.type,
        });
      } else {
        nodeForm.append(key, String(value));
      }
    }

    const apiRes = await api.post("/projects", nodeForm, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...nodeForm.getHeaders(),
      },
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error)?.message ?? "Server error" },
      { status: 500 }
    );
  }
}

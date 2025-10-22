import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { parse } from "cookie";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const sessionId = cookieStore.get("sessionId")?.value;
  const next = request.nextUrl.searchParams.get("next") || "/";

  if (refreshToken && sessionId) {
    const apiRes = await api.post("auth/refresh", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const accessToken: string | undefined = apiRes.data?.accessToken;

    if (!accessToken) {
      return NextResponse.json({ error: "No access token" }, { status: 500 });
    }

    const ACCESS_TTL_SEC = 15 * 60;
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_TTL_SEC,
    });

    const setCookie = apiRes.headers["set-cookie"];
    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed["Max-Age"]),
        };
        if (parsed.sessionId)
          cookieStore.set("sessionId", parsed.sessionId, options);
        if (parsed.refreshToken)
          cookieStore.set("refreshToken", parsed.refreshToken, options);
      }

      return apiRes;
    }
  }
  return NextResponse.redirect(new URL("/admin", request.url));
}

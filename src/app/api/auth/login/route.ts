import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { parse } from "cookie";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
 const apiRes = await api.post("auth/login", body);

  if (apiRes.status < 200 || apiRes.status >= 300) {
    return NextResponse.json(
      { error: apiRes.data?.message || "Unauthorized" },
      { status: apiRes.status || 401 }
    );
  }
    
  const cookieStore = await cookies();
  const setCookie = apiRes.headers["set-cookie"];
  const accessToken : string | undefined = apiRes.data?.data.accessToken;

   if (!accessToken) {
      return NextResponse.json({ error: "No access token" }, { status: 500 });
   }
      
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });


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

    return NextResponse.json({status: 200, message: "login successfull"});
  }
  }
  catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 }
}

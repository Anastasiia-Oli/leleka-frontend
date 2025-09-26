import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";

async function handle(req: NextRequest) {
  try {
    const backendRes = await api.post("/api/auth/refresh", null, {
      headers: { Cookie: req.headers.get("cookie") ?? "" },
    });

    const res = NextResponse.json({ success: true }, { status: 200 });
    const setCookies = backendRes.headers["set-cookie"];
    if (setCookies) {
      (Array.isArray(setCookies) ? setCookies : [setCookies]).forEach((c) =>
        res.headers.append("set-cookie", c)
      );
    }
    return res;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      return NextResponse.json({ success: false }, { status: 200 });
    }
    return NextResponse.json({ success: false }, { status: 200 });
  }
}

export const GET = handle;
export const POST = handle;

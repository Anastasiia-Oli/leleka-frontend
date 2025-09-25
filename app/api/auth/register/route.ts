import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const backendRes = await api.post("/api/auth/register", body, {
      headers: { Cookie: req.headers.get("cookie") ?? "" },
    });

    const res = NextResponse.json(backendRes.data, { status: backendRes.status });
    const setCookies = backendRes.headers["set-cookie"];
    if (setCookies) {
      (Array.isArray(setCookies) ? setCookies : [setCookies]).forEach((c) =>
        res.headers.append("set-cookie", c)
      );
    }
    return res;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      return NextResponse.json(err.response.data, { status: err.response.status });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

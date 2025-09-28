import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { api } from "../../api";
import { logErrorResponse } from "../../_utils/utils";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const apiRes = await api.post("api/auth/login", body, {
      headers: { Cookie: request.headers.get("cookie") ?? "" },
    });

    const setCookie = apiRes.headers["set-cookie"];
    if (setCookie) {
      const cookieStore = await cookies();
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          domain: parsed.Domain,
          maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
          httpOnly: Object.prototype.hasOwnProperty.call(parsed, "HttpOnly"),
          secure: Object.prototype.hasOwnProperty.call(parsed, "Secure"),
          sameSite:
            (parsed.SameSite as "lax" | "strict" | "none" | undefined) ??
            undefined,
        } as const;

        if (parsed.accessToken) {
          cookieStore.set("accessToken", parsed.accessToken, options);
        }
        if (parsed.refreshToken) {
          cookieStore.set("refreshToken", parsed.refreshToken, options);
        }
      }
    }

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse?.(error.response?.data);
      const status = error.response?.status ?? 500;
      const data = error.response?.data ?? { message: "Login failed" };
      return NextResponse.json(data, { status });
    }

    return NextResponse.json(
      { message: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

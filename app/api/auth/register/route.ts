import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const cookieStore = await cookies();

    const regRes = await api.post("api/auth/register", body, {
      headers: { Cookie: cookieStore.toString() },
    });

    const applySetCookie = (setCookieHeader?: string[] | string) => {
      if (!setCookieHeader) return { hasAccess: false, hasRefresh: false };

      const arr = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
      let hasAccess = false;
      let hasRefresh = false;

      for (const cookieStr of arr) {
        const parsed = parse(cookieStr);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
        } as const;

        if (parsed.accessToken) {
          cookieStore.set("accessToken", parsed.accessToken, options);
          hasAccess = true;
        }
        if (parsed.refreshToken) {
          cookieStore.set("refreshToken", parsed.refreshToken, options);
          hasRefresh = true;
        }
      }
      return { hasAccess, hasRefresh };
    };

    const { hasAccess, hasRefresh } = applySetCookie(regRes.headers["set-cookie"]);

    if (!hasAccess && hasRefresh) {
      const refreshRes = await api.get("api/auth/refresh", {
        headers: { Cookie: cookieStore.toString() },
      });
      applySetCookie(refreshRes.headers["set-cookie"]);
    }

    return NextResponse.json(regRes.data, {
      status: regRes.status,
      headers: { "set-cookie": cookieStore.toString() },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      const status = error.response?.status ?? 500;
      return NextResponse.json(error.response?.data ?? { message: "Register failed" }, { status });
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

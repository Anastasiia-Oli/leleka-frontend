import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

type Props = {
  params: Promise<{ week: number }>;
};

export async function GET({ params }: Props) {
  try {
    const cookie = await cookies();
    const { week } = await params;
    const res = await api(`api/weeks/${week}`, {
      headers: { Cookie: cookie.toString() },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

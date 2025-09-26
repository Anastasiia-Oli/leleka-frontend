import nextServer from "@/lib/api/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { weekNumber: string } }
) {
  try {
    const { weekNumber } = params;

    const { data } = await nextServer.get(`/weeks/${weekNumber}`);

    return NextResponse.json({ momDailyTips: data.momDailyTips });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

import { cookies } from "next/headers";
import { api } from "../../api";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  try {
    const { data } = await api.get("/users/current", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    if (data) return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
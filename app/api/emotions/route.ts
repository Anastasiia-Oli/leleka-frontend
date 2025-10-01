import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../api";

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data } = await api.get("/api/emotions", {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    });

    if (data) {
      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    console.error("Failed to fetch emotions:", error);
  }

  return NextResponse.json(
    { error: "Failed to fetch emotions" },
    { status: 500 }
  );
}

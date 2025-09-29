import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../api";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  try {
    const body = await request.json();
    const { data } = await api.post("/api/diaries", body, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    });

    if (data) {
      return NextResponse.json(data, { status: 201 });
    }
  } catch (error) {
    console.error("Failed to create diary entry:", error);
  }

  return NextResponse.json(
    { error: "Failed to create diary entry" },
    { status: 500 }
  );
}

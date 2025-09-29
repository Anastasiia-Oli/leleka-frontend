import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const cookieStore = await cookies();
    const { data } = await api.get(`/api/diaries/${id}`, {
      headers: { Cookie: cookieStore.toString() },
    });
    if (data) {
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error(`Failed to fetch diary ${id}:`, error);
  }
  return NextResponse.json(
    { error: `Failed to fetch diary ${id}` },
    { status: 500 }
  );
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const cookieStore = await cookies();

  try {
    const body = await request.json();
    const { data } = await api.patch(`/api/diaries/${id}`, body, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    });

    if (data) {
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error(`Failed to update diary ${id}:`, error);
  }

  return NextResponse.json(
    { error: `Failed to update diary ${id}` },
    { status: 500 }
  );
}

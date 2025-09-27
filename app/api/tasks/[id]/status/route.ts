import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const res = await fetch(`${API_URL}/tasks/${params.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${API_URL}/tasks/${params.id}`);
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

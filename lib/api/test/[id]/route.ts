import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updatedTask = { _id: params.id, ...body };
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ message: "Помилка сервера" }, { status: 500 });
  }
}

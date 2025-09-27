// app/api/test/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newTask = { _id: String(Date.now()), ...body }; // просто додаємо id
    return NextResponse.json(newTask);
  } catch (error) {
    return NextResponse.json({ message: "Помилка сервера" }, { status: 500 });
  }
}

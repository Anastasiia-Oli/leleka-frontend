import FormData from "form-data";
import { NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const formData = await request.formData();

    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Готуємо новий FormData для бекенду
    const backendFormData = new FormData();
    backendFormData.append("photo", Buffer.from(await file.arrayBuffer()), file.name);

    const { data } = await api.patch("/api/users/avatar", backendFormData, {
      headers: {
        ...backendFormData.getHeaders(),
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

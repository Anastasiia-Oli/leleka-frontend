// app/api/users/avatar/route.ts - remove form-data import conflict
import { NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";

export async function PATCH(req: Request) {
    try {
        const cookieStore = await cookies();
        const formData = await req.formData();
        const file = formData.get("avatar") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Create FormData for backend
        const backendFormData = new FormData();
        backendFormData.append("avatar", file);

        const { data } = await api.patch("api/users/avatar", backendFormData, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });

        return NextResponse.json(data);
    } catch (err) {
        console.error("Avatar upload error:", err);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
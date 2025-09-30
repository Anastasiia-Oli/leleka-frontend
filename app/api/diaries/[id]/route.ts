import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

type Props = {
  params: Promise<{ id: string }>;
};

// DELETE - видалити запис за ID
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "ID запису обов'язковий" },
        { status: 400 }
      );
    }

    // Розкоментуйте цей блок для реального видалення
    await api.delete(`api/diaries/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(
      {
        message: "Запис успішно видалено",
        deletedId: id,
      },
      { status: 200 }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

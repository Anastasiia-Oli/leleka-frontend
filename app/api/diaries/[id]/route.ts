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

type Params = { params: Promise<{ id: string }> };

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

export async function GET(_request: NextRequest, { params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();

  try {
    const { data } = await api.get(`/api/diaries/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Failed to fetch diary ${id}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch diary ${id}` },
      { status: 500 }
    );
  }
}

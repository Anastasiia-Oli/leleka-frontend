import { NextRequest, NextResponse } from "next/server";
import api from "../../api";

type Props = {
  params: Promise<{ id: string }>;
};

export async function PATCH({ params }: Props, request: NextRequest) {
  try {
    const { id } = await params;
    const res = await api(`/tasks/${id}`, {});
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    console.log(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";

type Props = { params: Promise<{ weekNumber: string }> };

export async function GET(request: NextRequest, { params }: Props) {
  const { weekNumber } = await params;
  try {
    const { data } = await api(`/api/weeks/${weekNumber}`, {
      headers: {
        Authorization: "Bearer 5iT52km5HvYfq07yTSGyviy6uZg+pSUV4J9YN9CH",
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      {
        status: (error as ApiError).status,
      }
    );
  }
}

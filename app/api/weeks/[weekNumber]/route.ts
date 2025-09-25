import { NextResponse } from "next/server";
import { api, ApiError } from "../../api";

export async function GET({
  params,
}: {
  params: Promise<{ weekNumber: string }>;
}) {
  const weekNumber = await params;
  try {
    const { data } = await api(`weeks/${weekNumber}`);
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

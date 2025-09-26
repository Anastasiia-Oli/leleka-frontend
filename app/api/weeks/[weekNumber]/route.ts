import { NextResponse } from "next/server";
import { api, ApiError } from "../../api";

export async function GET({ params }: { params: { weekNumber: string } }) {
  try {
    const { data } = await api(`/api/weeks/${params.weekNumber}`, {
      headers: {
        Authorization: "SV1UI1g6oB1kh3YqHNe2kR31ztls3jl7yaSheIZp",
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

import { NextRequest, NextResponse } from "next/server";
import api from "../api";

export async function GET(request: NextRequest) {
  try {
    const res = await api("/tasks", {});
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    console.log(error);
  }
}

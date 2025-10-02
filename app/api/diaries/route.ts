import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies(); // не потрібно await
    const body = await request.json();

    console.log("[/api/diaries] Forwarding to backend, body:", body);

    // Не нехтуй validateStatus — так ми зможемо логувати відповідь навіть для 4xx/5xx
    const resp = await api.post("/api/diaries", body, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    });

    console.log("[/api/diaries] Backend response status:", resp.status);
    console.log("[/api/diaries] Backend response data:", resp.data);

    // Спробуємо явно серіалізувати відповідь — щоб уникнути проблем з circular structures
    let safeData;
    try {
      safeData = JSON.parse(JSON.stringify(resp.data));
    } catch (serErr) {
      console.error("Failed to JSON.stringify backend response:", serErr);
      // Повертаємо мінімальну інфу, аби не ламати весь маршрут
      safeData = {
        message: "Response not serializable",
        rawType: typeof resp.data,
      };
    }

    // Якщо бекенд відповів успішно — проксирнемо статус і тіло
    if (resp.status >= 200 && resp.status < 300) {
      return NextResponse.json(safeData, { status: resp.status });
    }

    // Інакше повертаємо помилку з бекенду (щоб клієнт бачив справжню причину)
    return NextResponse.json(
      { error: "Backend error", status: resp.status, details: safeData },
      { status: resp.status }
    );
  } catch (error) {
    console.error("[/api/diaries] Unexpected error in proxy route:", error);

    if (isAxiosError(error)) {
      console.error(
        "Axios error response:",
        error.response?.status,
        error.response?.data
      );
      return NextResponse.json(
        {
          error: "Axios error",
          details: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error", message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const res = await api("/api/diaries", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
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

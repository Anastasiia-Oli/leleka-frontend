// app/api/diaries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../_utils/utils';

// GET - отримати всі записи щоденника
export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();

        // Backend поверне emotions як масив об'єктів з _id і title
        const res = await api('api/diaries', {
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
                { status: error.status || 500 }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// POST - створити новий запис
export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const body = await request.json();

        // body.emotions - це масив _id емоцій
        // Backend поверне створений запис з emotions як масивом об'єктів
        const res = await api.post('api/diaries', body, {
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
                { status: error.status || 500 }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
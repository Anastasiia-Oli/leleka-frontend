import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

// GET - отримати конкретний запис за ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = await cookies();
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { error: 'ID запису обов\'язковий' },
                { status: 400 }
            );
        }

        const res = await api.get(`api/diaries/${id}`, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);
            const status = error.response?.status ?? 500;
            const message = error.response?.status === 404 
                ? 'Запис не знайдено' 
                : 'Помилка отримання запису';
            
            return NextResponse.json(
                { error: message, response: error.response?.data },
                { status }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json(
            { error: 'Внутрішня помилка сервера' },
            { status: 500 }
        );
    }
}

// DELETE - видалити запис за ID
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = await cookies();
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { error: 'ID запису обов\'язковий' },
                { status: 400 }
            );
        }

        const res = await api.delete(`api/diaries/${id}`, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });

        return NextResponse.json(
            { message: 'Запис успішно видалено' },
            { status: 200 }
        );
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);
            const status = error.response?.status ?? 500;
            let message = 'Помилка видалення запису';
            
            if (error.response?.status === 404) {
                message = 'Запис не знайдено';
            } else if (error.response?.status === 403) {
                message = 'Немає прав для видалення цього запису';
            }
            
            return NextResponse.json(
                { error: message, response: error.response?.data },
                { status }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json(
            { error: 'Внутрішня помилка сервера' },
            { status: 500 }
        );
    }
}

// PUT - оновити запис за ID
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = await cookies();
        const { id } = params;
        const body = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: 'ID запису обов\'язковий' },
                { status: 400 }
            );
        }

        // Валідація основних полів
        if (!body.title || !body.description) {
            return NextResponse.json(
                { error: 'Заголовок та опис обов\'язкові' },
                { status: 400 }
            );
        }

        const res = await api.put(`api/diaries/${id}`, body, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);
            const status = error.response?.status ?? 500;
            let message = 'Помилка оновлення запису';
            
            if (error.response?.status === 404) {
                message = 'Запис не знайдено';
            } else if (error.response?.status === 403) {
                message = 'Немає прав для редагування цього запису';
            } else if (error.response?.status === 400) {
                message = 'Невірні дані для оновлення';
            }
            
            return NextResponse.json(
                { error: message, response: error.response?.data },
                { status }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json(
            { error: 'Внутрішня помилка сервера' },
            { status: 500 }
        );
    }
}
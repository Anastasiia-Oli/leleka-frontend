import { NextResponse } from 'next/server';

export async function GET() {
  // Тут буде ваша логіка для виходу користувача.
  // Зазвичай, це включає в себе:
  // 1. Очищення або видалення кукі з токеном автентифікації.
  // 2. Інвалідація токена на стороні сервера (якщо потрібно).

  // Приклад очищення кукі (якщо ви використовуєте їх):
  const response = NextResponse.json({ message: 'Logout successful' });
  // response.cookies.delete('auth_token'); // Приклад видалення кукі

  return response;
}
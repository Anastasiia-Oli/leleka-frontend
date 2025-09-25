import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Отримуємо дані з тіла запиту
    const body = await request.json();
    const { name, email, password } = body;

    // 2. Валідація даних (перевіряємо, чи всі поля заповнені)
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // 3. Тут буде ваша логіка реєстрації:
    // - Перевірка, чи існує email в базі даних.
    // - Хешування пароля.
    // - Створення нового користувача в базі даних.

    // 4. Повертаємо успішну відповідь
    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 } // 201 Created - це стандартний код для успішного створення ресурсу
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const nextServer = axios.create({
  baseURL,
  // Вимикаємо withCredentials щоб уникнути CORS проблем
  withCredentials: false,
  timeout: 20000, // Збільшуємо таймаут до 20 секунд
  headers: {
    'Content-Type': 'application/json',
    // Додаємо заголовки для CORS
    'Accept': 'application/json',
  }
});

// Інтерсептор для запитів
nextServer.interceptors.request.use(
  (config) => {
    console.log(` Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);

    // Перевіряємо, чи працюємо в браузері
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Added authorization token');
      } else {
        console.log('No access token found');
      }
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Покращений інтерсептор для відповідей
nextServer.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Детальне логування помилки
    console.error('API Error Details:', {
      url: originalRequest?.url,
      fullUrl: `${originalRequest?.baseURL}${originalRequest?.url}`,
      method: originalRequest?.method?.toUpperCase(),
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      code: error.code
    });

    // Обробка помилки 401 (Unauthorized) без автоматичного refresh
    if (error.response?.status === 401) {
      console.log('Authentication required - 401 error detected');

      if (typeof window !== 'undefined') {
        // Очищуємо токен і перенаправляємо на сторінку входу
        localStorage.removeItem('accessToken');
        // Не робимо автоматичне перенаправлення - залишаємо це компонентам
        console.log('Token cleared, authentication needed');
      }
    }

    // Обробка мережевих помилок
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
      console.error('Network error detected. Server might be down or unreachable.');

      // Перевіряємо, чи це проблема з CORS
      if (error.message.includes('CORS') || error.message.includes('Access-Control-Allow-Origin')) {
        console.error('CORS error detected. Server configuration issue.');
      }

      // Можна додати retry логіку для мережевих помилок (але не для CORS)
      if (!originalRequest._networkRetry && originalRequest._retryCount < 1 && !error.message.includes('CORS')) {
        originalRequest._networkRetry = true;
        originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

        console.log(`Retrying network request (attempt ${originalRequest._retryCount}/1)`);

        // Затримка перед повторним запитом
        await new Promise(resolve => setTimeout(resolve, 2000));

        return nextServer(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default nextServer;

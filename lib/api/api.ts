import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER || "https://leleka-backend-1.onrender.com/api";

const nextServer = axios.create({ 
  baseURL, 
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Інтерсептор для запитів
nextServer.interceptors.request.use(
  (config) => {
    // Перевіряємо, чи працюємо в браузері
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    // Для серверних запитів додаємо cookies з headers
    if (typeof window === 'undefined' && config.headers.Cookie) {
      // Cookies вже налаштовані в serverApi.ts
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Інтерсептор для відповідей
nextServer.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      if (typeof window !== 'undefined') {
        // Спробуємо оновити токен
        try {
          const refreshResponse = await nextServer.post('/auth/refresh');
          const newToken = refreshResponse.data?.data?.accessToken;
          
          if (newToken) {
            localStorage.setItem('accessToken', newToken);
            nextServer.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return nextServer(originalRequest);
          }
        } catch (refreshError) {
          // Якщо оновлення токену не вдалося
          localStorage.removeItem('accessToken');
          window.location.href = '/sign-in';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default nextServer;
// import axios from "axios";

// const baseURL = process.env.NEXT_PUBLIC_SERVER;

// const nextServer = axios.create({ baseURL, withCredentials: true });

// export default nextServer;

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER || "https://leleka-backend-1.onrender.com";

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
    // Додаємо токен авторизації, якщо він є
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
  (error) => {
    if (error.response?.status === 401) {
      // Видаляємо невалідний токен
      localStorage.removeItem('accessToken');
      // Можна додати редирект на сторінку логіну
      // window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

export default nextServer;
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER || "https://leleka-backend-1.onrender.com";

const nextServer = axios.create({ 
  baseURL, 
  withCredentials: false, // Змінено з true на false
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
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
      }
    }
    return Promise.reject(error);
  }
);

export default nextServer;
import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;

const nextServer = axios.create({ baseURL, withCredentials: true });

// 🧪 тимчасово додаємо інтерсептор
nextServer.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const fakeToken = localStorage.getItem("fakeToken");
    if (fakeToken) {
      config.headers.Authorization = `Bearer ${fakeToken}`;
    }
  }
  return config;
});

// --------------------

export default nextServer;

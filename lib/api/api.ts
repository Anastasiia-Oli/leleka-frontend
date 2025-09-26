// import axios from "axios";

// const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

// const nextServer = axios.create({ baseURL, withCredentials: true });

// export default nextServer;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // 👈 твій бекенд
  withCredentials: true, // 👈 дозволяє передавати cookies і токен
});

export default api;

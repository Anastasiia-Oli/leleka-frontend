import api from "./api";

export interface Emotion {
  _id: string;
  title: string;
}

export const getEmotions = async () => {
  try {
    const token = "Rnt8p6yVTqPJZAgN8nhZTz8gWOXyhFYcYC29oHY5"; // сюди тимчасово встав свій токен вручну
    const { data } = await api.get("/emotions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Помилка при завантаженні емоцій:", error);
    throw new Error("Не вдалося завантажити емоції");
  }
};

// export const getEmotions = async () => {
//   try {
//     // ⬇️ Автоматично беремо токен із localStorage
//     const token = localStorage.getItem("token");
//     if (!token) {
//       throw new Error("Токен не знайдено. Користувач не авторизований.");
//     }

//     const { data } = await api.get("/emotions", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return data;
//   } catch (error) {
//     console.error("Помилка при завантаженні емоцій:", error);
//     throw new Error("Не вдалося завантажити емоції");
//   }
// };

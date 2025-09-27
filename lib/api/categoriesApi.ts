import api from "./api";

export interface Emotion {
  _id: string;
  title: string;
}

export const getEmotions = async () => {
  try {
    const token = "moXcGpzqpuznLrL8zSo1f5pN7Ii2g/rERb0Mp1ML"; // сюди тимчасово встав свій токен вручну
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

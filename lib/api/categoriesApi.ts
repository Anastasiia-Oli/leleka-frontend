import api from "./api";

export interface Emotion {
  _id: string;
  title: string;
}

export const getEmotions = async (): Promise<Emotion[]> => {
  try {
    const { data } = await api.get("/emotions");
    return data;
  } catch (error) {
    console.error("Помилка при завантаженні емоцій:", error);
    throw new Error("Не вдалося завантажити емоції");
  }
};

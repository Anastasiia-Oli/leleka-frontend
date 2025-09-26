import nextServer from "./api";

export interface Emotion {
  _id: string;
  title: string;
}

export const getEmotions = async () => {
  try {
    const token = "Jc2RoHeWf8djjjhKikPgPU/j0rfsPk2iiMVOjpE4"; // сюди тимчасово встав свій токен вручну
    const { data } = await nextServer.get(
      "http://localhost:3000/api/emotions",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Помилка при завантаженні емоцій:", error);
    throw new Error("Не вдалося завантажити емоції");
  }
};

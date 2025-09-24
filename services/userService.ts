import { User } from "../types/user";

const API_URL = "http://localhost:3000"; // бекенд

// отримати поточного юзера
export async function getCurrentUser(token: string): Promise<User> {
  const res = await fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Не вдалося отримати користувача");
  return res.json();
}

// оновити дані профілю
export async function updateUserData(
  token: string,
  data: Partial<User>
): Promise<User> {
  const res = await fetch(`${API_URL}/users/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Не вдалося оновити дані");
  return res.json();
}

// оновити аватар
export async function updateUserAvatar(
  token: string,
  file: File
): Promise<User> {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await fetch(`${API_URL}/users/avatar`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error("Не вдалося оновити аватар");
  return res.json();
}

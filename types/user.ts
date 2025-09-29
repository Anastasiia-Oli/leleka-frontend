// types/user.ts
export type ChildSex = "Ще не знаю" | "Дівчинка" | "Хлопчик";

export interface User {
  _id: string;
  name: string;
  email: string;
  childSex?: ChildSex;
  dueDate?: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}


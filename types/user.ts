export type ChildSex = "Ще не знаю" | "Дівчинка" | "Хлопчик";

export interface User {
  _id: string;
  name: string;
  email: string;
  childSex: ChildSex;
  dueDate: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}
export type Task = {
  _id?: string;
  text?: string;
  date?: string | undefined;
  isDone?: boolean;
};

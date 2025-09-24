import nextServer from "./api";

export interface Task {
  text: string;
  date: string;
  isDone: boolean;
}

export async function getTasks() {
  const { data } = await nextServer.get<Task>("/api/tasks");
  return data;
}

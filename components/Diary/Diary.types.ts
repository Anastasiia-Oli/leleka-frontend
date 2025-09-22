export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  emotions: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  createdAt?: Date;
  updatedAt?: Date;
}
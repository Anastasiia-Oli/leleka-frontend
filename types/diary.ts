export interface DiaryEntry {
  _id: string;
  title: string;
  description?: string;
  date: string;
  emotions?: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDiaryEntryData {
  title: string;
  description: string;
  //   date?: string;
  emotions: string[];
}

export interface getEmotionStyle {
  bgColor: string;
  textColor: string;
}

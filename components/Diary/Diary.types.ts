// components/Diary/Diary.types.ts
export interface DiaryEntry {
  _id: string;
  title: string;
  description: string;
  date: string;
  emotions: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateDiaryEntryData {
  title: string;
  description: string;
  date?: string;
  emotions: string[];
}

export interface UpdateDiaryEntryData extends CreateDiaryEntryData {}

export interface getEmotionStyle {
  bgColor: string;
  textColor: string;
}

// Мапування старих типів на нові для зворотної сумісності
export interface LegacyDiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  emotions: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Функція для конвертації API відповіді в legacy формат
export const convertApiEntryToLegacy = (apiEntry: DiaryEntry): LegacyDiaryEntry => ({
  id: apiEntry._id,
  title: apiEntry.title,
  content: apiEntry.description,
  date: apiEntry.date,
  emotions: apiEntry.emotions,
  createdAt: new Date(apiEntry.createdAt),
  updatedAt: new Date(apiEntry.updatedAt),
});

// Функція для конвертації legacy формату в API формат
export const convertLegacyEntryToApi = (legacyEntry: Partial<LegacyDiaryEntry>): CreateDiaryEntryData => ({
  title: legacyEntry.title || '',
  description: legacyEntry.content || '',
  date: legacyEntry.date,
  emotions: legacyEntry.emotions || [],
});
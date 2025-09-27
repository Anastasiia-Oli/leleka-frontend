// export interface DiaryEntry {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
//   emotions: string[];
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Note {
//   id: string;
//   title: string;
//   content: string;
//   date: string;
//   createdAt?: string | Date;
//   updatedAt?: string | Date;
// }

// export interface CreateDiaryEntryData {
//   title: string;
//   description: string;
//   date?: string;
//   emotions: string[];
// }

// export interface UpdateDiaryEntryData extends CreateDiaryEntryData {}

// export interface getEmotionStyle {
//   bgColor: string;
//   textColor: string;
// }

// // Legacy типи для зворотної сумісності
// export interface LegacyDiaryEntry {
//   id: string;
//   title: string;
//   content: string;
//   date: string;
//   emotions: string[];
//   createdAt?: string | Date;
//   updatedAt?: string | Date;
// }

// // Функції конвертації
// export const convertApiEntryToLegacy = (apiEntry: DiaryEntry): LegacyDiaryEntry => ({
//   id: apiEntry._id,
//   title: apiEntry.title,
//   content: apiEntry.description,
//   date: apiEntry.date,
//   emotions: apiEntry.emotions,
//   createdAt: new Date(apiEntry.createdAt),
//   updatedAt: new Date(apiEntry.updatedAt),
// });

// export const convertLegacyEntryToApi = (legacyEntry: Partial<LegacyDiaryEntry>): CreateDiaryEntryData => ({
//   title: legacyEntry.title || '',
//   description: legacyEntry.content || '',
//   date: legacyEntry.date,
//   emotions: legacyEntry.emotions || [],
// });
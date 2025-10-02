
export interface Emotion {
    _id: string;
    title: string;
}

export interface DiaryEntry {
    _id: string;
    title: string;
    description?: string;
    date: string;
    emotions?: Emotion[]; // Тепер масив об'єктів з _id і title
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateDiaryEntryData {
    title: string;
    description: string;
    emotions: string[]; // При створенні передаємо масив _id
    date?: string;
}

export interface UpdateDiaryEntryData {
    title?: string;
    description?: string;
    emotions?: string[]; // При оновленні передаємо масив _id
    date?: string;
}
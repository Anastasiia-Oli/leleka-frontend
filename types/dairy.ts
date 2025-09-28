export interface DiaryEntry {
    _id: string;
    title: string;
    description?: string;
    date: string;
    emotions?: Emotion[];
    userId: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Emotion {
    _id: string,
    title: string
}

export interface CreateDiaryEntryData {
    title: string;
    description: string;
    emotions: Emotion[];
}




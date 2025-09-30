export interface DiaryEntryData {
  title: string;
  description: string;
  date?: string;
  emotions: string[];
  // не міняти на Emotion[], бо бекенд чекає масив рядків (title),
  // і валідація дозволяє тільки string[]
}

export interface Emotion {
  _id: string;
  title: string;
}

// export interface DiaryEntry {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
//   emotions: Emotion[];
// }

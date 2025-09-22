
import React from "react";
import { DiaryEntry } from "../Diary.types";
import { EMOTIONS } from "../Diary.constants";


interface DiaryEntryCardProps {
  entry: DiaryEntry;
  onClick?: () => void;
  isSelected?: boolean;
}

const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({ entry, onClick, isSelected }) => {
  const getEmotionStyle = (emotionName: string) => {
    const emotion = EMOTIONS.find(e => e.name === emotionName);
    return emotion ? { bgColor: emotion.bgColor, textColor: emotion.textColor } : 
           { bgColor: "bg-gray-100", textColor: "text-gray-700" };
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-pink-100 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:bg-pink-150 mb-4
        ${isSelected ? 'ring-2 ring-pink-300 bg-pink-200' : ''}
      `}
    >
      <h3 className="font-medium text-gray-900 mb-2">{entry.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{entry.date}</p>
      <div className="flex flex-wrap gap-2">
        {entry.emotions.map((emotion, index) => {
          const style = getEmotionStyle(emotion);
          return (
            <span 
              key={index} 
              className={`${style.bgColor} ${style.textColor} px-3 py-1 rounded-full text-xs font-medium`}
            >
              {emotion}
            </span>
          );
        })}
      </div>
    </div>
  );
};
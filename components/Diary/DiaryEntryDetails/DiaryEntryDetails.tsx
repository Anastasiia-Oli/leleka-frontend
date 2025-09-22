interface DiaryEntryDetailsProps {
  entry: DiaryEntry | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

const DiaryEntryDetails: React.FC<DiaryEntryDetailsProps> = ({ 
  entry, 
  onEdit, 
  onDelete 
}) => {
  const getEmotionStyle = (emotionName: string) => {
    const emotion = EMOTIONS.find(e => e.name === emotionName);
    return emotion ? { bgColor: emotion.bgColor, textColor: emotion.textColor } : 
           { bgColor: "bg-gray-100", textColor: "text-gray-700" };
  };

  if (!entry) {
    return (
      <div className="bg-white rounded-xl h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg">Наразі записи у щоденнику відсутні</p>
          <p className="text-sm mt-2">Оберіть запис зі списку, щоб переглянути деталі</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl h-full flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Перший привіт</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span>{entry.date}</span>
              <button onClick={onEdit} className="flex items-center gap-1 hover:text-gray-900">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button 
            onClick={onDelete}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <div>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {entry.content}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {entry.emotions.map((emotion, index) => {
              const style = getEmotionStyle(emotion);
              return (
                <span 
                  key={index} 
                  className={`${style.bgColor} ${style.textColor} px-3 py-2 rounded-full text-sm font-medium`}
                >
                  {emotion}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
// import React, { useEffect, useState } from 'react';

// const GreetingBlock: React.FC = () => {
//   const [userName, setUserName] = useState<string | null>(null);

//   useEffect(() => {
//     // Симуляція API запиту для отримання імені користувача
//     const fetchUserName = async () => {
//       try {
//         // Тут буде реальний API запит
//         // const response = await fetch('/api/user');
//         // const data = await response.json();
//         // setUserName(data.name);
        
//         // Поки що використовуємо моковані дані
//         setTimeout(() => {
//           setUserName('Ганна');
//         }, 100);
//       } catch (error) {
//         console.error('Помилка при отриманні імені:', error);
//         setUserName('користувач');
//       }
//     };

//     fetchUserName();
//   }, []);

//   return (
//     <div style={{ marginBottom: "32px" }}>
//       <h1 className="header-first" style={{ margin: 0 }}>
//         Доброго ранку, {userName ?? 'користувачу'}!
//       </h1>
//     </div>
//   );
// };

// export default GreetingBlock;
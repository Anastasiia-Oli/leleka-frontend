// 'use client';

// import React from 'react';
// import { useCurrentUser, useGreeting } from '@/hooks/useUsers';

// const GreetingBlock: React.FC = () => {
//   const { data: user, isLoading, error } = useCurrentUser();
//   const greeting = useGreeting();

//   const userName = error ? 'користувач' : (user?.name || 'користувач');

//   return (
//     <div style={{ marginBottom: "32px" }}>
//       <h1 className="header-first" style={{ margin: 0 }}>
//         {greeting}{isLoading ? '' : `, ${userName}`}!
//       </h1>
//     </div>
//   );
// };

// export default GreetingBlock;
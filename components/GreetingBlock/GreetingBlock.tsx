"use client";

import React, { useEffect, useState } from 'react';

const GreetingBlock: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchUserName = async () => {
      try {
        // Тут буде реальний API запит
        setTimeout(() => {
          setUserName('Ганна');
        }, 100);
      } catch (error) {
        console.error('Помилка при отриманні імені:', error);
        setUserName('користувач');
      }
    };

    fetchUserName();
  }, [isClient]);

  // Запобігає hydration mismatch
  if (!isClient) {
    return (
      <div style={{ marginBottom: "32px" }}>
        <h1 className="header-first" style={{ margin: 0 }}>
          Доброго ранку!
        </h1>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "32px" }}>
      <h1 className="header-first" style={{ margin: 0 }}>
        Доброго ранку, {userName ?? 'користувачу'}!
      </h1>
    </div>
  );
};

export default GreetingBlock;
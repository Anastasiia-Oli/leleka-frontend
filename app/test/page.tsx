'use client';

import { useState } from 'react';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import { useRouter } from 'next/navigation';

export default function TestPage() {
  const [isOpen, setIsOpen] = useState(false);
const router = useRouter();

  const handleConfirm = () => {
    router.push('/');
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>Тестова сторінка для модалки</h1>
      <button onClick={() => setIsOpen(true)}>Відкрити модалку</button>

      <ConfirmationModal
        title="Ви точно хочете вийти?"
        confirmButtonText="Так"
        cancelButtonText="Ні"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isOpen={isOpen}
      />
    </div>
  );
}

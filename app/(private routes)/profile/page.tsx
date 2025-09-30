import React from 'react';
// Шлях до вашого компонента OnboardingPage
// (припускаючи, що він знаходиться у папці components/)
import OnboardingPage from '../../../components/OnboardingPage/OnboardingPage'; 
import { getMe } from '../../../lib/api/clientApi';
// import styles from '../../../components/OnboardingPage/OnboardingPage.module.css';
getMe();
// Функція-компонент, яка буде сторінкою /profile
const ProfilePage = () => {
  // Тут ми рендеримо (показуємо) ваш імпортований компонент
  return <OnboardingPage />;
};

export default ProfilePage;
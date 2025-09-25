// // import React from "react";

// // const page = () => {
// //   return <div>page</div>;
// // };

// // export default page;


"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./userProfile.module.css";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";

// --- УВАГА: Замініть цей URL на реальний URL вашого бекенду ---
const API_URL = "https://leleka-backend-1.onrender.com/api";

export default function UserProfilePage() {
  // const router = useRouter();
  // Стан для відстеження статусу авторизації та завантаження
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Стан для даних користувача
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("невідомо");
  const [dueDate, setDueDate] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Стан для завантаження нового аватара
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Хук для завантаження даних при завантаженні сторінки
  useEffect(() => {
    const fetchUserData = async () => {
      // 1. Отримуємо токен з локального сховища
      const token = localStorage.getItem("authToken");

      // 2. Перевіряємо, чи існує токен
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);
      setLoading(true);

      try {
        // 3. Виконуємо GET-запит до бекенду
        const response = await fetch(`${API_URL}/users/current`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // 4. Перевіряємо відповідь
        if (!response.ok) {
          throw new Error("Не вдалося завантажити дані профілю");
        }

        const userData = await response.json();
        console.log("Дані користувача отримано:", userData);

        // 5. Оновлюємо стан компонента
        setName(userData.name || "");
        setEmail(userData.email || "");
        setGender(userData.gender || "невідомо");
        setDueDate(userData.dueDate || "");
        setAvatarUrl(userData.avatarUrl || null);

      } catch (error) {
        console.error("Помилка при завантаженні даних:", error);
        // Якщо токен недійсний, можливо, треба вийти з системи
        if (error instanceof Error && error.message.includes("401")) {
          localStorage.removeItem("authToken");
          setIsLoggedIn(false);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Пустий масив залежностей: запускається лише один раз

  // Обробник для вибору нового файлу аватара
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file));
      setAvatarUrl(null); // Очищаємо URL з бекенду, щоб показати прев'ю
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  // Обробник для збереження змін
  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("dueDate", dueDate);
    if (avatarFile) {
      formData.append("avatar", avatarFile); // 'avatar' має відповідати назві поля на бекенді
    }

    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Не вдалося зберегти дані");
      }

      console.log("Дані успішно оновлено!");
      // Після успішного збереження, можна перезавантажити дані
      const updatedData = await response.json();
      setName(updatedData.name);
      setEmail(updatedData.email);
      setAvatarUrl(updatedData.avatarUrl);

    } catch (error) {
      console.error("Помилка при збереженні:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Тут можна скинути стан до початкових значень, отриманих з бекенду
    console.log("Зміни скасовано.");
  };

  // --- Умовний рендеринг ---
  if (loading) {
    return <div className={styles.loadingMessage}>Завантаження даних профілю...</div>;
  }

  if (!isLoggedIn) {
    // Тимчасова кнопка для тестування, поки немає сторінки логіну
    const handleTestLogin = () => {
      const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.2O1XkYJ-pS2XQ5iG8rF6pS-E5mGg-jP8Y8z8b2M4";
      localStorage.setItem("authToken", fakeToken);
      window.location.reload(); 
    };

    return (
      <div className={styles.notLoggedInMessage}>
        <p>Будь ласка, увійдіть у свій акаунт.</p>
        <button onClick={handleTestLogin} className={styles.loginBtn}>Імітувати вхід</button>
      </div>
    );
  }

  // Основний рендеринг, коли дані завантажено
  return (
    <div className={styles.container}>
      {/* <header className={styles.header}> */}
        {/* <div className={styles.logo}>ЛОГО</div> */}
        {/* <div className={styles.title}>Лелека</div> */}
        {/* <button className={styles.burger}>☰</button> */}
      {/* </header> */}

      {/* <div className={styles.breadcrumb}>Лелека &gt; Профіль</div> */}
             <Breadcrumbs />
      <main className={styles.main}>
        {/* <aside className={styles.sidebar}>Сайдбар</aside> */}

        <section className={styles.section}>
          <div className={styles.profileTop}>
            <div className={styles.avatarContainer}>
              {preview ? (
                <Image src={preview} alt="Avatar preview" width={150} height={150} className={styles.avatar} />
              ) : avatarUrl ? (
                <Image src={avatarUrl} alt="User avatar" width={150} height={150} className={styles.avatar} />
              ) : (
                <div className={styles.avatarPlaceholder}>Фото</div>
              )}
            </div>
            
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>{name}</h2>
              <p className={styles.userEmail}>{email}</p>

              <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
              <button type="button" onClick={handleChooseFile} className={styles.uploadBtn}>
                Завантажити нове фото
              </button>
            </div>
          </div>

          <label className={styles.label}>
            Ім’я
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
          </label>

          <label className={styles.label}>
            Пошта
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
          </label>

          <label className={styles.label}>
            Стать дитини
            <select value={gender} onChange={(e) => setGender(e.target.value)} className={styles.select}>
              <option value="дівчинка">Дівчинка</option>
              <option value="хлопчик">Хлопчик</option>
              <option value="невідомо">Невідомо</option>
            </select>
          </label>

          <label className={styles.label}>
            Планова дата пологів
            <input type="month" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={styles.input} />
          </label>

          <div className={styles.buttons}>
            <button onClick={handleCancel} className={styles.cancelBtn}>
              Відмінити зміни
            </button>
            <button onClick={handleSave} className={styles.saveBtn}>
              Зберегти зміни
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}







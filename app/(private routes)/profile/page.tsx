"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./userProfile.module.css";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import Cookies from 'js-cookie';

// --- УВАГА: Замініть цей URL на реальний URL вашого бекенду ---
// const API_URL = "https://leleka-backend-1.onrender.com/api";
const API_URL = `/api`;

// Створюємо інтерфейс для даних, які оновлюються
interface UpdatedProfileData {
  name?: string;
  email?: string;
  gender?: string;
  dueDate?: string;
}

export default function UserProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [initialName, setInitialName] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [initialGender, setInitialGender] = useState("невідомо");
  const [initialDueDate, setInitialDueDate] = useState("");
  const [initialAvatarUrl, setInitialAvatarUrl] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("невідомо");
  const [dueDate, setDueDate] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("accessToken");

      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);
      setLoading(true);

      try {
        const response = await fetch(`${API_URL}/users/current`, {
          method: "GET",
          // credentials: "include",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Не вдалося завантажити дані профілю");
        }

        const userDataWrapper = await response.json();
        const userData = userDataWrapper.data;
        console.log("Дані користувача отримано:", userData);

        setInitialName(userData.name || "");
        setInitialEmail(userData.email || "");
        setInitialGender(userData.gender || "невідомо");
        setInitialDueDate(userData.dueDate || "");
        setInitialAvatarUrl(userData.avatarUrl || null);

        setName(userData.name || "");
        setEmail(userData.email || "");
        setGender(userData.gender || "невідомо");
        setDueDate(userData.dueDate || "");
        setAvatarUrl(userData.avatarUrl || null);
      } catch (error) {
        console.error("Помилка при завантаженні даних:", error);
        if (error instanceof Error && error.message.includes("401")) {
          localStorage.removeItem("authToken");
          setIsLoggedIn(false);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file));
      setAvatarUrl(null);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    setLoading(true);
    

    // Використовуємо наш новий тип для updatedFields
    const updatedFields: UpdatedProfileData = {};
    let isAvatarChanged = false;

    if (name !== initialName) {
      updatedFields.name = name;
    }
    if (email !== initialEmail) {
      updatedFields.email = email;
    }
    if (gender !== initialGender) {
      updatedFields.gender = gender;
    }
    if (dueDate !== initialDueDate) {
      updatedFields.dueDate = dueDate;
    }
    if (avatarFile) {
      isAvatarChanged = true;
    }

    if (Object.keys(updatedFields).length === 0 && !isAvatarChanged) {
        setLoading(false);
        console.log("Немає змін для збереження.");
        return;
    }

    const formData = new FormData();

    for (const key in updatedFields) {
      formData.append(key, updatedFields[key as keyof UpdatedProfileData] as string);
    }

    if (isAvatarChanged) {
      formData.append("avatar", avatarFile as Blob);
    }

    try {
      const response = await fetch(`${API_URL}/users/current`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Не вдалося зберегти дані");
      }

      console.log("Дані успішно оновлено!");
      const updatedData = await response.json();
      
      setInitialName(updatedData.name || "");
      setInitialEmail(updatedData.email || "");
      setInitialGender(updatedData.gender || "невідомо");
      setInitialDueDate(updatedData.dueDate || "");
      setInitialAvatarUrl(updatedData.avatarUrl || null);
      
      setAvatarFile(null);
      setPreview(null);
      setAvatarUrl(updatedData.avatarUrl || null);

    } catch (error) {
      console.error("Помилка при збереженні:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName(initialName);
    setEmail(initialEmail);
    setGender(initialGender);
    setDueDate(initialDueDate);
    setAvatarFile(null);
    setPreview(null);
    setAvatarUrl(initialAvatarUrl);
    console.log("Зміни скасовано.");
  };

  if (loading) {
    return <div className={styles.loadingMessage}>Завантаження даних профілю...</div>;
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <main className={styles.main}>
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
            Ім`&apos;`я
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
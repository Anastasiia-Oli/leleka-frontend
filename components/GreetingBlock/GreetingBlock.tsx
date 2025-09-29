"use client"
import React from "react";
import { useAuthUserStore } from "@/lib/store/authStore";
import css from "./GreetingBlock.module.css";

const GreetingBlock = () => {
  const user = useAuthUserStore((state) => state.user);

  return (
    <div className={css.greeting}>
      <h1 className={css.text}>Вітаю, {user.name || "користувачу"}!</h1>
    </div>

  );
};

export default GreetingBlock;
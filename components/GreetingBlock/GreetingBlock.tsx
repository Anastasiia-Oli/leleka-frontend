"use client"
import React from "react";
import { useAuthUserStore } from "@/lib/store/authStore";
import css from "./GreetingBlock.module.css";

const GreetingBlock = () => {
  const user = useAuthUserStore((state) => state.user);

  return (
    <div className={css.greeting}>
      <h2 className="header-second">Вітаю, {user.name || "користувачу"}!</h2>
    </div>

  );
};

export default GreetingBlock;
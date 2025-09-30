"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthUserStore } from "@/lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const REFRESH_INTERVAL = 14 * 60 * 1000; // 14m

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthUserStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthUserStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };
    fetchUser();

    //  refreshes token
    const intervalId = setInterval(async () => {
      await fetchUser();
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [setUser, clearIsAuthenticated]);
  return children;
};

export default AuthProvider;

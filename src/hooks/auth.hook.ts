import { useState, useEffect, useCallback } from "react";
import {LoginData} from "../types/types";

const storageName:string = "userData";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState<boolean>(false);

  const login = useCallback((jwtToken: string, id:string) => {

    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
      })
    );
  }, []);


  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
  }, []);


  useEffect(() => {
    const storageItem:any = localStorage.getItem(storageName)
    const data:LoginData = JSON.parse(storageItem);

    if (data && data.token && data.userId) {
      login(data.token, data.userId);
    }

    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};

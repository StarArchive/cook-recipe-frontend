import { UserContext } from "@/contexts/UserContext";
import { notifications } from "@mantine/notifications";
import { ReactNode, useCallback, useEffect, useState } from "react";

async function fetchUserInfo() {
  const resp = await fetch("http://localhost:3000/v1/users/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const json = await resp.json();

  if (!resp.ok) {
    notifications.show({
      title: "错误",
      message: "网络错误，请稍后重试",
      color: "red",
      position: "top-center",
    });
    return;
  }

  return json;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string | null>(null);

  const syncUser = useCallback(async () => {
    const userInfo = await fetchUserInfo();

    if (!userInfo) return;
    setUserName(userInfo.name);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token.length > 0) syncUser();
  }, [syncUser]);

  const logout = () => {
    localStorage.removeItem("token");
    setUserName(null);
    notifications.show({
      title: "退出登录成功",
      message: "您已成功退出登录",
      color: "blue",
      position: "top-center",
    });
  };

  return (
    <UserContext.Provider value={{ userName, logout, syncUser }}>
      {children}
    </UserContext.Provider>
  );
}

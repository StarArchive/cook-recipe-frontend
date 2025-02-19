import { Button, HoverCard, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TbLogout, TbUpload } from "react-icons/tb";
import { Link } from "react-router-dom";

import { getUser, logout } from "@/client";

export default function UserActions() {
  const { data, isFetched, error } = useQuery({
    queryKey: ["users/me"],
    queryFn: async () => await getUser(),
    retry: false,
  });

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (error?.message == "Unauthorized" && localStorage.getItem("token")) {
      localStorage.removeItem("token");
      notifications.show({
        title: "登录失效",
        message: "请重新登录",
        color: "red",
        position: "top-center",
      });
    }
  }, [error?.message]);

  if (!isFetched) return null;
  if (data?.name)
    return (
      <>
        <HoverCard>
          <HoverCard.Target>
            <Text>{data.name}</Text>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Button
              leftSection={<TbLogout size={14} />}
              variant="default"
              bd={0}
              onClick={() => {
                setIsClicked(true);
                logout();
              }}
              disabled={isClicked}
            >
              <Text size="sm">退出登录</Text>
            </Button>
          </HoverCard.Dropdown>
        </HoverCard>

        <Button
          component={Link}
          to="/recipe/new"
          rightSection={<TbUpload size={14} />}
        >
          上传
        </Button>
      </>
    );

  return (
    <>
      <Button component={Link} to="/register" variant="subtle">
        注册
      </Button>
      <Button component={Link} to="/login">
        登录
      </Button>
    </>
  );
}

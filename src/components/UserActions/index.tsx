import { Button, HoverCard, Text } from "@mantine/core";
import {
  TbLogout,
  TbReceipt,
  TbSettings,
  TbStar,
  TbUpload,
} from "react-icons/tb";
import { useSWRConfig } from "swr";
import { Link, useLocation } from "wouter";

import { logout } from "@/client";
import { getUserDisplayName, useCurrentUser } from "@/utils";

export default function UserActions() {
  const { user, isLoading, isError } = useCurrentUser();
  const [, navigate] = useLocation();
  const { mutate } = useSWRConfig();

  const actions = [
    {
      icon: <TbReceipt size={14} />,
      text: "我的食谱",
      onClick: () => {
        navigate(`/space/${user?.id}`);
      },
    },
    {
      icon: <TbStar size={14} />,
      text: "收藏列表",
      onClick: () => {
        navigate(`/space/${user?.id}/stars`);
      },
    },
    {
      icon: <TbSettings size={14} />,
      text: "账号设置",
      onClick: () => {
        navigate("/settings");
      },
    },
    {
      icon: <TbLogout size={14} />,
      text: "退出登录",
      onClick: () => {
        logout();
        mutate("/users/me");
      },
    },
  ];

  if (isLoading) return null;
  if (!user?.name || isError)
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

  return (
    <>
      <HoverCard>
        <HoverCard.Target>
          <Text>{getUserDisplayName(user)}</Text>
        </HoverCard.Target>
        <HoverCard.Dropdown p="xs">
          <div className="flex flex-col">
            {actions.map(({ icon, text, onClick }) => (
              <Button
                key={text}
                leftSection={icon}
                variant="default"
                bd={0}
                onClick={onClick}
              >
                <Text size="sm">{text}</Text>
              </Button>
            ))}
          </div>
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
}

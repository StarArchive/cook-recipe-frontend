import { Avatar, Button, HoverCard, Skeleton, Text } from "@mantine/core";
import {
  TbLogout,
  TbPaperBag,
  TbReceipt,
  TbSettings,
  TbStar,
  TbUpload,
} from "react-icons/tb";
import { useSWRConfig } from "swr";
import { Link, useLocation } from "wouter";

import { getImageUrl, logout } from "@/client";
import { useCurrentUser, useUserProfile } from "@/client/hooks";

export default function UserActions() {
  const { user, isLoading, isError } = useCurrentUser();
  const { profile } = useUserProfile(user?.id.toString());
  const [, navigate] = useLocation();
  const { mutate } = useSWRConfig();

  const actions = [
    {
      icon: <TbReceipt size={14} />,
      text: "我的食谱",
      onClick: () => {
        navigate(`/user/${user?.id}`);
      },
    },
    {
      icon: <TbStar size={14} />,
      text: "收藏列表",
      onClick: () => {
        navigate(`/user/${user?.id}/starred-recipes`);
      },
    },
    {
      icon: <TbPaperBag size={14} />,
      text: "我的草稿",
      onClick: () => {
        navigate("/recipe/drafts");
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

  if (isLoading)
    return (
      <>
        <Skeleton height={38} circle />
        <Skeleton height={36} width={84} />
      </>
    );

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
          <Avatar src={getImageUrl(profile?.avatar || "").toString()} />
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

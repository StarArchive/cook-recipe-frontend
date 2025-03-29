import { useLocation } from "wouter";

import RootLayout from "@/layouts/RootLayout";
import { useUser, useUserProfile } from "@/utils";

import UserPageBasicInfo from "./Sections/BasicInfo";
import UserPageTabs from "./Sections/Tabs";

interface Props {
  id: string;
  tabAnchor: string;
}

export default function UserPage({ id, tabAnchor }: Props) {
  const { user } = useUser(id);
  const { profile } = useUserProfile(id);
  const [, navigate] = useLocation();

  if (!user || !profile) return <RootLayout>Loading...</RootLayout>;

  return (
    <RootLayout>
      <div className="mx-auto max-w-3xl">
        <UserPageBasicInfo user={user} profile={profile} />
        <UserPageTabs
          id={user.id}
          anchor={tabAnchor}
          onChange={(value) => navigate(`/user/${id}/${value}`)}
        />
      </div>
    </RootLayout>
  );
}

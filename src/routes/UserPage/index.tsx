import RootLayout from "@/layouts/RootLayout";
import { useUser, useUserProfile } from "@/utils";

import UserPageBasicInfo from "./Sections/BasicInfo";
import UserPageTabs from "./Sections/Tabs";

interface Props {
  id: string;
}

export default function UserPage({ id }: Props) {
  const { user } = useUser(id);
  const { profile } = useUserProfile(id);

  if (!user || !profile) return <RootLayout>Loading...</RootLayout>;

  return (
    <RootLayout>
      <div className="mx-auto max-w-3xl">
        <UserPageBasicInfo user={user} profile={profile} />
        <UserPageTabs id={user.id} />
      </div>
    </RootLayout>
  );
}

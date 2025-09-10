import OrganizationCard from "@/app/components/dashboard-components/OrganizationCard";
import ProfileCard from "@/app/components/dashboard-components/ProfileCard";

import React from "react";

export default function ProfilePage() {
  return (
    <div
      className={"md:flex flex-col items-center justify-center my-[10vh] mx-2"}
    >
      <div className={"gap-5 space-y-5 md:space-y-0  md:flex "}>
        <ProfileCard />
        <OrganizationCard />
      </div>{" "}
    </div>
  );
}

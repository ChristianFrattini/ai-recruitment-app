import InviteForm from "@/app/components/dashboard-components/InviteForm";
import OrganizationCard from "@/app/components/dashboard-components/OrganizationCard";
import ProfileCard from "@/app/components/dashboard-components/ProfileCard";
import { useUserStore } from "@/store/userStore";
import React from "react";

export default function ProfilePage() {
  return (
    <div className={"md:flex flex-col items-center justify-center my-[10vh]"}>
      <div className={"gap-[7vh] md:flex"}>
        <ProfileCard />
        <OrganizationCard />
      </div>{" "}
    </div>
  );
}

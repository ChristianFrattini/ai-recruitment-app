import { Suspense } from "react";
import InvitePageComponent from "../components/dashboard-components/InvitePageComponent";

export default function InvitePage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <InvitePageComponent />;
    </Suspense>
  );
}

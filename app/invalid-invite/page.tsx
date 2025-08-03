import { Suspense } from "react";
import InviteError from "../components/dashboard-components/InviteError";

export default function InvalidInvitePage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <InviteError />
    </Suspense>
  );
}

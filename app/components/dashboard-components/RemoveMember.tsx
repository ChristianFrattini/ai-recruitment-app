"use client";

import { removeMember, updateAdmins } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { X } from "lucide-react";
import React, { useActionState, useState } from "react";
import SubmitButton from "../SubmitButton";

type User = {
  firstName: string;
  lastName: string;
  title: string;
  id: string;
  email: string;
  createdAt: Date;
  profileImage: string;
  specialization: string;
  isAdmin: boolean;
  organizationId: string;
};

type RemoveMemberProps = {
  users: User[];
  userId: string; // 👈 add this
};
export default function ManageMember({ users, userId }: RemoveMemberProps) {
  const [adminStates, setAdminStates] = useState(
    users?.map((u) => ({ id: u.id, isAdmin: u.isAdmin })),
  );

  const toggleUser = (id: string, checked: boolean) => {
    setAdminStates((prev) =>
      prev?.map((u) => (u.id === id ? { ...u, isAdmin: checked } : u)),
    );
  };

  return (
    <div>
      <h2 className="mb-5 font-medium">Manage organization members</h2>

      {users?.map((user) => {
        const current = adminStates.find((u) => u.id === user.id)!;

        return (
          <div
            key={user.id}
            className="flex gap-5 mx-2 mb-3 p-5 justify-between items-center border border-gray-200 rounded-md shadow-md"
          >
            <div>
              <p className="font-semibold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Toggle Admin */}
              <div className="flex items-center gap-2">
                <Switch
                  disabled={user.id === userId} // Disable switch for current user
                  checked={current.isAdmin}
                  onCheckedChange={(checked) => toggleUser(user.id, checked)}
                />
                <span className="text-sm text-gray-600">Admin</span>
              </div>

              {/* Delete user */}
              <form action={removeMember}>
                <input type="hidden" name="memberId" value={user.id} />
                <Button
                  variant="destructive"
                  size="icon"
                  className="group"
                  type="submit"
                  disabled={user.id === userId} // Disable button for current user
                >
                  <X className="h-5 w-5 group-hover:rotate-90 duration-300" />
                </Button>
              </form>
            </div>
          </div>
        );
      })}

      {/* Save button at bottom */}
      <form action={updateAdmins} className="mt-6 flex justify-end">
        {adminStates?.map((u) => (
          <input
            key={u.id}
            type="hidden"
            name="user"
            value={`${u.id}:${u.isAdmin}`}
          />
        ))}
        <SubmitButton text={"Save Changes"} loadingText={"Saving"} />
      </form>
    </div>
  );
}

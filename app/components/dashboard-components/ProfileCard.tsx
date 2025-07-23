import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import ProfileForm from "./ProfileForm";
import { useUserStore } from "@/store/userStore";
import { fetchUser } from "@/lib/fetchData";

export default async function ProfileCard() {
  const user = await fetchUser();

  return (
    <>
      <Card className="p-6 shadow-md bg-slate-50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Personal Information</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Your profile
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-start  gap-6 flex-col md:flex-row">
            {/* Avatar Section */}
            <Avatar className="w-16 h-16">
              <AvatarFallback className="text-xl font-semibold bg-gray-200 text-gray-700">
                {`${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Info + Inputs Section */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Name + Email */}
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              {/* Input Fields in 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-700">Title</Label>
                  <Input value={user.title} disabled />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-700">
                    Specialised in
                  </Label>
                  <Input value={user.specialization} disabled />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-700">
                    Total CVs uploaded
                  </Label>
                  <Input
                    value={user.candidates.length}
                    type="number"
                    disabled
                  />
                </div>
              </div>

              {/* Modal Button */}
            </div>
          </div>
        </CardContent>
        <CardFooter className={"flex items-center justify-center"}>
          <div className="flex justify-center mt-6">
            <Modal>
              <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-md hover:opacity-90 transition w-full md:w-fit">
                <span>Update Info</span>
              </ModalTrigger>
              <ModalBody>
                <ModalContent>
                  <ProfileForm
                    id={user.id as string}
                    name={user.firstName as string}
                    lastName={user.lastName as string}
                    email={user?.email as string}
                    title={user?.title as string}
                    specialization={user?.specialization as string}
                  />
                </ModalContent>
              </ModalBody>
            </Modal>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

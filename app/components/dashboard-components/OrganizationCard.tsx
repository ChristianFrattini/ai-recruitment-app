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
import React from "react";

import OrganizationForm from "./OrganizationForm";

import InviteForm from "./InviteForm";
import { fetchOrganization } from "@/lib/fetchData";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

import { Plus } from "lucide-react";

export default async function OrganizationCard() {
  const org = await fetchOrganization();

  const members =
    org?.users?.map((user, index) => ({
      id: index,
      name: `${user.firstName} ${user.lastName}`,
      designation: user.specialization,
      image: user.profileImage,
    })) || [];
  //console.log("MEmbers", members);

  return (
    <>
      <Card className="p-6 shadow-md bg-slate-50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Organization Information</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Your organization
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-start gap-6 flex-col md:flex-row">
            {/* Avatar Section */}
            <Avatar className="w-16 h-16">
              <AvatarFallback className="text-xl font-semibold bg-gray-200 text-gray-700">
                RA
              </AvatarFallback>
            </Avatar>

            {/* Info + Form Section */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Name + Subtext */}
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  {org?.name}
                </h2>
                <p className="text-sm text-gray-500">Company</p>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-700">
                    Organization ID
                  </Label>
                  <Input value={org?.id} disabled />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-gray-700">
                    Organization Name
                  </Label>
                  <Input value={org?.name} disabled />
                </div>
              </div>
              {/*Members list */}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center flex-wrap  mt-6">
            <p className={"text-md font-medium"}>
              Members of this organization:
            </p>
            <div
              className={
                "flex flex-wrap items-center justify-between w-full mt-4 "
              }
            >
              <div className={"flex"}>
                {members && members.length > 0 ? (
                  <AnimatedTooltip items={members} />
                ) : (
                  <p className="text-sm text-gray-500">
                    No members found in this organization.
                  </p>
                )}
              </div>

              <div className={"flex items-center justify-end"}>
                <Modal>
                  <ModalTrigger className="ml-5 flex items-center justify-end bg-white text-black hover:bg-gray-400  border shadow-md rounded-full hover:opacity-90 transition duration-300 w-full md:w-fit">
                    <div className={"flex flex-col items-center"}>
                      <Plus className={"h-5 w-5"} />
                      <span>Invite</span>
                    </div>
                  </ModalTrigger>
                  <ModalBody>
                    <ModalContent
                      className={"flex items-center justify-center"}
                    >
                      <InviteForm orgId={org?.id as string} />
                    </ModalContent>
                  </ModalBody>
                </Modal>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center flex-col mt-6">
          <Modal>
            <ModalTrigger>
              <span>Update Info</span>
            </ModalTrigger>
            <ModalBody>
              <ModalContent>
                {org ? (
                  <OrganizationForm org={org} />
                ) : (
                  <div className="text-center text-red-500">
                    Organization data not found.
                  </div>
                )}
              </ModalContent>
            </ModalBody>
          </Modal>
        </CardFooter>
      </Card>
    </>
  );
}

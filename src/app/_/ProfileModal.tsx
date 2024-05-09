import { Await } from "@/components/Await";
import { Modal } from "@/components/Modal";
import { ModalSkeleton } from "@/components/ModalSkeleton";
import { PropsWithChildren, Suspense } from "react";
import { ProfileModalClient } from "./ProfileModal.client";
import { getProfile } from "./ProfileModal.server";

export function ProfileModal({ children }: PropsWithChildren) {
  return (
    <Modal title="Update your profile" Trigger={children}>
      <Suspense fallback={<ModalSkeleton />}>
        <Await promise={getProfile()}>
          {(profile) => {
            return <ProfileModalClient profile={profile} />;
          }}
        </Await>
      </Suspense>
    </Modal>
  );
}

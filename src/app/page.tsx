import { Button } from "@/components/ui/button";
import { ProfileModal } from "./_/ProfileModal";

export default function Home() {
  return (
    <div className="h-dvh w-screen grid place-items-center">
      <ProfileModal>
        <Button>Update my profile</Button>
      </ProfileModal>
    </div>
  );
}

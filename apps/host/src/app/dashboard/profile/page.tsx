import { FullScreenContainer } from "@/shared/ui/fullscreen-container";
import { EditProfileForm } from "@/widgets/edit-profile-form/edit-profile-form";

export default function ProfilePage() {
  return (
    <FullScreenContainer className="flex">
      <EditProfileForm />
    </FullScreenContainer>
  );
}

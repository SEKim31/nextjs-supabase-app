import { ProfileSetupForm } from "@/components/profile/profile-setup-form";

export default function ProfileSetupTestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-[430px]">
        <ProfileSetupForm />
      </div>
    </div>
  );
}

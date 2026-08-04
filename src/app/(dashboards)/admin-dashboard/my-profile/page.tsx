import { getMyProfile } from "@/service/getMyProfile";
import { Card, CardContent } from "@/components/ui/card";
import { CustomerProfileForm } from "@/app/(public)/(customer)/_components/CustomerProfileForm";

export const metadata = {
  title: "My Profile - Dashboard",
  description: "View your dashboard profile information.",
};

export default async function MyProfilePage() {
  const result = await getMyProfile();
  const user = result.data;

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md border-border/60 bg-card/80 shadow-sm">
          <CardContent className="p-8 text-center text-muted-foreground">
            Unable to load your profile right now.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <CustomerProfileForm user={user} />
    </div>
  );
}

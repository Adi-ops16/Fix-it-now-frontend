import { getMyProfile } from "@/service/getMyProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, ShieldCheck, UserRound } from "lucide-react";

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
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-secondary/10 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <UserRound className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">{user.name}</h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
              {user.role}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-border/60 bg-card/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Profile Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3 rounded-2xl bg-muted/40 p-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-muted/40 p-3">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Status: {user.user_status}</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-muted/40 p-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Location details will be added here later.</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-linear-to-br from-primary/10 via-background to-secondary/15 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Role</p>
                <p className="mt-2 text-base font-medium text-foreground">{user.role}</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Account status</p>
                <p className="mt-2 text-base font-medium text-foreground">{user.user_status}</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Member since</p>
                <p className="mt-2 text-base font-medium text-foreground">{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

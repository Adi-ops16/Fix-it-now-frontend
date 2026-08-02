import { Card, CardContent } from '@/components/ui/card';
import { getMyProfile } from '@/service/getMyProfile';
import { TechnicianProfileForm } from '../_components/TechnicianProfileForm';

export const metadata = {
    title: 'My Profile - Technician Dashboard',
    description: 'View and update your technician profile information.',
};

export default async function TechnicianProfilePage() {
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
            <TechnicianProfileForm user={user} />
        </div>
    );
}
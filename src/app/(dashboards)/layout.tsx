'use client';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from './_components/DashboardSidebar';
import ThemeToggleButton from '@/components/shared/ThemeToggleButton';
import { useUser } from '@/hooks/useUser';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useUser()
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full overflow-hidden bg-background">
                <DashboardSidebar />
                <SidebarInset className="flex-1">
                    <header className="flex h-16 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur sm:px-6">
                        <div className="flex items-center gap-3">
                            <div>
                                <p className="text-sm font-semibold text-foreground">Welcome to your Dashboard, <span className='text-primary'>{user?.name?.toUpperCase()}</span></p>
                            </div>
                        </div>
                        <ThemeToggleButton />
                    </header>
                    <main className="flex-1 overflow-auto">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
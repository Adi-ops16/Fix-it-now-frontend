"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserRound, LogOut, LucideProps, WrenchIcon, PenBoxIcon, LucidePaperclip, Users, LayoutGrid, TimerIcon } from "lucide-react";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarTrigger, useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Logo from "@/components/shared/Logo";
import { ForwardRefExoticComponent, RefAttributes, useMemo } from "react";
import { ContextUser } from "@/contexts/UserContext";
import { logOut } from "@/app/(auth)/_actions/authActions";

interface NavItem {
    title: string;
    href: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export default function DashboardSidebar({ user, loading, refreshUser }: { user: ContextUser | null, loading: boolean, refreshUser: () => Promise<void> }) {
    const pathname = usePathname();
    const { state } = useSidebar();
    const collapsed = state === "collapsed";
    const router = useRouter()

    const navItems: NavItem[] = useMemo<NavItem[]>(() => {
        if (!user) return []

        if (user?.role === "ADMIN") {
            return [
                { title: "My Profile", href: "/admin-dashboard/my-profile", icon: UserRound },
                { title: "Manage Users", href: "/admin-dashboard/manage-users", icon: Users },
                { title: "Create Category", href: "/admin-dashboard/create-category", icon: PenBoxIcon },
                { title: "Categories", href: "/admin-dashboard/all-categories", icon: LayoutGrid }
            ]
        }

        if (user?.role === "TECHNICIAN") {
            return [
                { title: "My Profile", href: "/technician-dashboard/my-profile", icon: UserRound },
                { title: "My Services", href: "/technician-dashboard/my-services", icon: WrenchIcon },
                { title: "Create Service", href: "/technician-dashboard/create-service", icon: PenBoxIcon },
                { title: "My Bookings", href: "/technician-dashboard/my-bookings", icon: LucidePaperclip },
                { title: "Create Schedule", href: "/technician-dashboard/create-availability", icon: TimerIcon },
            ]
        }

        return []
    }, [user]);

    const handleLogout = () => {
        logOut();
        refreshUser();
        router.push("/");
    }

    return (
        <Sidebar collapsible="icon" className="border-r border-border/60 bg-sidebar text-sidebar-foreground">
            <SidebarHeader className="border-b border-border/60">
                <div className={`${!collapsed && "flex justify-between items-center"}`}>
                    <Link href="/" className="flex items-center gap-2 overflow-hidden">
                        <div className="flex gap-2 items-center">
                            <Logo size="md" />
                            {!collapsed && <span className="text-sm font-semibold tracking-wide">FIX-IT NOW</span>}
                        </div>
                    </Link>
                    {!collapsed && <SidebarTrigger className="h-8 w-8 rounded-full" />}
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2 py-3">
                <SidebarGroup>
                    <SidebarMenu>
                        {loading ?
                            <div className="space-y-2">
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <div key={index} className="mb-2">
                                        <SidebarMenuSkeleton />
                                        <SidebarMenuSkeleton />
                                        <SidebarMenuSkeleton />
                                    </div>
                                ))
                                }
                            </div>
                            : navItems.map((item) => {
                                const Icon = item.icon;
                                const active = pathname === item.href;

                                const itemButton = (
                                    <Link href={item.href} className="flex items-center gap-2 ">
                                        <SidebarMenuButton isActive={active} className="h-10 cursor-pointer mb-2">
                                            <Icon className="h-4 w-4" />
                                            {!collapsed && <span>{item.title}</span>}
                                        </SidebarMenuButton>
                                    </Link>
                                );

                                if (collapsed) {
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <Tooltip>
                                                <TooltipTrigger render={itemButton} />
                                                <TooltipContent side="right">{item.title}</TooltipContent>
                                            </Tooltip>
                                        </SidebarMenuItem>
                                    );
                                }

                                return <SidebarMenuItem key={item.title}>{itemButton}</SidebarMenuItem>;
                            })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-border/60 py-3">
                <div className={`${!collapsed && "flex items-center justify-between gap-2"}`}>
                    <div className={"flex items-center gap-1"}>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <UserRound className="h-4 w-4" />
                        </div>
                        {!collapsed &&
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">{user?.name}</p>
                                <p className="truncate text-xs text-muted-foreground">{user?.role?.toLowerCase()}</p>
                            </div>
                        }
                    </div>
                    {!collapsed &&
                        <Button
                            size="sm"
                            variant="outline"
                            className="gap-2 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    }
                </div>
            </SidebarFooter>
        </Sidebar >
    );
}
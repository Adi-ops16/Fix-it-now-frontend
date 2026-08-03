"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound, LogOut, LucideProps, WrenchIcon, PenBoxIcon, LucidePaperclip, Users } from "lucide-react";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarTrigger, useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Logo from "@/components/shared/Logo";
import { useUser } from "@/hooks/useUser";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export default function DashboardSidebar() {
    const pathname = usePathname();
    const { state } = useSidebar();
    const collapsed = state === "collapsed";

    const { user } = useUser()
    const navItems: {
        title: string;
        href: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    }[] = [];

    if (user?.role === "ADMIN") {
        navItems.push({ title: "My Profile", href: "/admin-dashboard/my-profile", icon: UserRound })
        navItems.push({ title: "Manage Users", href: "/admin-dashboard/manage-users", icon: Users })
    }
    if (user?.role === "TECHNICIAN") {
        navItems.push({ title: "My Profile", href: "/technician-dashboard/my-profile", icon: UserRound })
        navItems.push({ title: "My Services", href: "/technician-dashboard/my-services", icon: WrenchIcon })
        navItems.push({ title: "create-service", href: "/technician-dashboard/create-service", icon: PenBoxIcon })
        navItems.push({ title: "my-bookings", href: "/technician-dashboard/my-bookings", icon: LucidePaperclip })
    }

    return (
        <Sidebar collapsible="icon" className="border-r border-border/60 bg-sidebar text-sidebar-foreground">
            <SidebarHeader className="border-b border-border/60">
                <div className={`${!collapsed && "flex justify-between items-center"}`}>
                    <Link href="/" className="flex items-center gap-2 overflow-hidden">
                        {!collapsed && <Logo size="md" />}
                        {!collapsed && <span className="text-sm font-semibold tracking-wide">FIX-IT NOW</span>}
                    </Link>
                    <SidebarTrigger className="h-8 w-8 rounded-full" />
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2 py-3">
                <SidebarGroup>
                    <SidebarMenu>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = pathname === item.href;

                            const itemButton = (
                                <Link href={item.href} className="flex items-center gap-2 mb-2">
                                    <SidebarMenuButton isActive={active} className="h-10 cursor-pointer">
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
                        <Button size="sm" variant="outline" className="gap-2 cursor-pointer">
                            <LogOut className="h-4 w-4" />
                            Login
                        </Button>
                    }
                </div>
            </SidebarFooter>
        </Sidebar >
    );
}
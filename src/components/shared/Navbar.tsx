'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, User, LogOut, CircleArrowOutUpRight, Settings, Wrench, Info, CalendarDays, Briefcase, LayoutDashboard, Users, Home, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Logo from './Logo';
import { IUser } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ThemeToggleButton from './ThemeToggleButton';
import { logOut } from '@/app/(auth)/_actions/authActions';
import { toast } from 'sonner';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';

interface NavbarProps {
    user: IUser | null;
}

const Navbar = ({ user }: NavbarProps) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { refreshUser } = useUser()

    const [scrolled, setScrolled] = useState(false)
    const { scrollY } = useScroll()
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    // Common navigation links
    const commonNavItems: Array<{ label: string; href: string; icon: LucideIcon }> = [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Services', href: '/services', icon: Wrench },
        { label: 'About Us', href: '/about', icon: Info },
    ];

    // Role-based navigation links
    const getRoleBasedItems = () => {
        const items = [...commonNavItems];

        if (user?.role === 'CUSTOMER') {
            items.push(
                { label: 'My Bookings', href: '/bookings', icon: CalendarDays },
                { label: 'My Profile', href: '/profile', icon: User },
                { label: 'My Payments', href: '/payment-history', icon: Wallet },
            );
        } else if (user?.role === 'TECHNICIAN') {
            items.push(
                { label: 'Dashboard', href: '/technician-dashboard/my-profile', icon: LayoutDashboard }
            );
        } else if (user?.role === 'ADMIN') {
            items.push(
                { label: 'Dashboard', href: '/admin-dashboard/my-profile', icon: LayoutDashboard }
            );
        }

        return items;
    };

    const menuItems = getRoleBasedItems();

    const handleLogout = () => {
        logOut()
        setIsProfileOpen(false);
        refreshUser()
        router.replace("/")
        toast.success("You have been logged out")
    };

    return (
        <motion.nav className={`fixed ${scrolled ? "top-3" : "top-0"} z-50 w-full backdrop-blur-md`}>

            <motion.div
                initial={false}
                animate={{ opacity: scrolled ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 90, damping: 22 }}
                className="absolute inset-0"
            />

            <div className={`relative z-10`}>
                <motion.div
                    animate={{
                        maxWidth: scrolled ? '80rem' : '100%',
                        borderRadius: scrolled ? '1.5rem' : '0rem',
                    }}
                    transition={{ type: 'spring', stiffness: 110, damping: 22 }}
                    className={`w-full mx-auto px-4 sm:px-6 lg:px-8 bg-background/60`}
                >
                    <div className={`flex justify-between items-center transition-all duration-500 ease-in-out ${scrolled ? "h-12" : "h-16"}`}>

                        {/* Logo */}
                        <Link href="/" className="shrink-0 flex items-center">
                            <Logo size={scrolled ? "lg" : "xl"} className="transition-all duration-500 ease-in-out" />
                        </Link>

                        {/* Desktop Links */}
                        <div className={`hidden md:flex items-center transition-all duration-500 ease-in-out ${scrolled ? "gap-1" : "gap-6 lg:gap-8"}`}>
                            {menuItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2"
                                >
                                    <item.icon size={16} />
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Right Side Actions */}
                        <div className="hidden md:flex items-center gap-3">
                            {!user ? (
                                <Link
                                    href="/login"
                                    className="px-6 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full hover:opacity-90 transition-opacity duration-200"
                                >
                                    Login
                                </Link>
                            ) : (
                                <div className="flex justify-center items-center gap-2">
                                    <div
                                        onMouseEnter={() => setIsProfileOpen(true)}
                                        onMouseLeave={() => setIsProfileOpen(false)}
                                        className="relative flex items-center gap-2 p-1">
                                        {user.photo_url ? (
                                            <Image

                                                width={36}
                                                height={36}
                                                src={user.photo_url}
                                                alt={user.name}
                                                className="w-9 h-9 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                                                <User size={16} className="text-primary-foreground" />
                                            </div>
                                        )}
                                        {/* User Profile Dropdown */}
                                        <AnimatePresence>
                                            {isProfileOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute right-7 top-12 w-48 bg-card rounded-lg shadow-lg border border-border overflow-hidden"
                                                >
                                                    <div className="px-4 py-2 border-b border-border">
                                                        <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                                    </div>

                                                    <Link
                                                        href={`${user.role === "CUSTOMER" ?
                                                            "/profile" :
                                                            user.role === "ADMIN" ?
                                                                "/admin-dashboard/my-profile" :
                                                                "/technician-dashboard/my-profile"
                                                            }`}
                                                        className="px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors flex items-center gap-1"
                                                    >
                                                        <Settings size={16} />
                                                        Profile Settings
                                                    </Link>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-accent transition-colors flex items-center gap-2"
                                                    >
                                                        <LogOut size={16} />
                                                        Logout
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {user.role === "CUSTOMER" &&
                                        <Button variant={"secondary"}>
                                            <CircleArrowOutUpRight />
                                            <Link href={"/be-a-technician"}>Be a Technician</Link>
                                        </Button>
                                    }

                                </div>
                            )}
                            <ThemeToggleButton />
                        </div>

                        {/* mobile sidebar open button */}
                        <div className='md:hidden flex justify-center gap-2'>
                            <ThemeToggleButton />
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className=" p-2 rounded-lg hover:bg-accent transition-colors"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="md:hidden overflow-hidden border-t border-border"
                            >
                                <div className="px-2 pt-2 pb-4 space-y-2">
                                    {menuItems.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="px-3 py-2 rounded-lg text-base font-medium text-foreground bg-accent/40 transition-colors cursor-pointer flex items-center gap-2"
                                        >
                                            <item.icon size={16} />
                                            {item.label}
                                        </Link>
                                    ))}

                                    {user && user.role === "CUSTOMER" &&
                                        <Link href={"/be-a-technician"}>
                                            <Button className={"w-full mt-1"} variant={"secondary"}>
                                                <CircleArrowOutUpRight />
                                                Be a Technician
                                            </Button>
                                        </Link>
                                    }

                                    <div className="">
                                        {!user ? (
                                            <Link
                                                href="/login"
                                                onClick={() => setIsOpen(false)}
                                                className="block px-3 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition-opacity w-full text-center"
                                            >
                                                Login
                                            </Link>
                                        ) : (
                                            <>
                                                <Button
                                                    onClick={() => {
                                                        setIsOpen(false);
                                                        handleLogout();
                                                    }}
                                                    variant={"destructive"}
                                                    className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-accent rounded-lg transition-colors flex items-center gap-2 mt-1"
                                                >
                                                    <LogOut size={16} />
                                                    Logout
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.nav >
    );
};

export default Navbar;
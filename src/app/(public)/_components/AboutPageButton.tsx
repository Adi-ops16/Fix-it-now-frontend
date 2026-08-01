"use client"
import { Button } from '@/components/ui/button';
import { IUser } from '@/lib/types';
import { getMyProfile } from '@/service/getMyProfile';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const AboutPageButton = (
    { children, hasArrow = true, classname, variant = "default", user }: {
        children: React.ReactNode,
        hasArrow?: boolean,
        classname?: string,
        variant?: "outline" | "default"
        user: IUser | null
    }) => {

    const router = useRouter()

    const handleButtonClick = () => {
        if (!user) {
            router.push("/register")
        } else {
            toast.info("You are already logged in")
        }
    }

    return <Button onClick={handleButtonClick} variant={variant} className={`w-full rounded-full cursor-pointer flex items-center gap-1 ${classname}`}>
        {children}
        {hasArrow && <ArrowRight className="h-4 w-4" />}
    </Button>;
};

export default AboutPageButton;
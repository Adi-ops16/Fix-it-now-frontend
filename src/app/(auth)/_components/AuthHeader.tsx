"use client";

import Logo from "@/components/shared/Logo";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="mb-8 flex flex-col justify-center items-center">
      <Logo size="xl" />
      <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}

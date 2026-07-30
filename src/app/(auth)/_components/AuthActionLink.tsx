"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface AuthActionLinkProps {
  prompt: string;
  buttonLabel: string;
  href: string;
  buttonVariant?: "default" | "outline";
}

export default function AuthActionLink({
  prompt,
  buttonLabel,
  href,
  buttonVariant = "outline",
}: AuthActionLinkProps) {
  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-card text-muted-foreground">{prompt}</span>
        </div>
      </div>

      <Link href={href} className="block w-full group">
        <Button type="button" variant={buttonVariant} className="w-full cursor-pointer">
          {buttonLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </Link>
    </>
  );
}

"use client";

interface AuthFooterInfoProps {
    description: string;
}

export default function AuthFooterInfo({
    description,
}: AuthFooterInfoProps) {
    return (
        <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>{description}</p>
            <div className="flex items-center justify-center gap-4 mt-1">
                <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
                <span>•</span>
                <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
            </div>
        </div>
    );
}

"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const ServicePagination = ({
    currentPage,
    totalPages,
}: PaginationProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("page", page.toString());

        router.push(`${pathname}?${params.toString()}`);
    };

    const getPages = () => {
        // 5 step array construct algorithm
        const pages: (number | "...")[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }

            return pages;
        }

        pages.push(1);

        if (currentPage > 3) {
            pages.push("...");
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    };

    return (
        <div className="flex flex-wrap items-center justify-center gap-2">

            <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
            >
                <ChevronLeft className="size-4" />
            </Button>

            {getPages().map((page, index) =>
                page === "..." ? (
                    <Button
                        key={index}
                        variant="ghost"
                        size="icon"
                        disabled
                    >
                        <MoreHorizontal className="size-4" />
                    </Button>
                ) : (
                    <Button
                        key={page}
                        variant={
                            page === currentPage
                                ? "default"
                                : "outline"
                        }
                        className="h-10 w-10"
                        onClick={() => changePage(page)}
                    >
                        {page}
                    </Button>
                )
            )}

            <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => changePage(currentPage + 1)}
            >
                <ChevronRight className="size-4" />
            </Button>
        </div>
    );
}

export default ServicePagination
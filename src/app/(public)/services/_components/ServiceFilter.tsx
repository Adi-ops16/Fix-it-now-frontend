"use client";

import { Search, ArrowUpDown, MapPin, X } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ServiceFilters = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(
        searchParams.get("searchTerms") ?? ""
    );

    const [location, setLocation] = useState(
        searchParams.get("location") ?? ""
    );

    const sortOrder = searchParams.get("sortOrder") ?? "desc";

    const updateQuery = (
        values: Partial<{
            searchTerms: string;
            location: string;
            sortOrder: string;
        }>
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(values).forEach(([key, value]) => {
            if (!value) params.delete(key);
            else params.set(key, value);
        });

        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            updateQuery({
                searchTerms: search,
                location,
            });
        }, 500);

        return () => clearTimeout(timeout);
    }, [search, location]);

    useEffect(() => {
        setSearch(searchParams.get("searchTerms") ?? "");
        setLocation(searchParams.get("location") ?? "");
    }, [searchParams]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-5"
        >
            <div className="grid gap-4 md:grid-cols-3">

                {/* Search */}

                <div className="relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={18}
                    />

                    <Input
                        placeholder="Search services..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-10 bg-primary/3"
                    />

                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Location */}

                <div className="relative">
                    <MapPin
                        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground"
                        size={18}
                    />

                    <Input
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10 bg-primary/3"
                    />

                    {location && (
                        <button
                            onClick={() => setLocation("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Sort */}

                <Select
                    value={sortOrder}
                    onValueChange={(value) => updateQuery({ sortOrder: value ?? undefined })}
                >
                    <SelectTrigger>
                        <div className="flex items-center gap-2">
                            <ArrowUpDown size={16} />
                            <SelectValue />
                        </div>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="desc">
                            Newest First
                        </SelectItem>

                        <SelectItem value="asc">
                            Oldest First
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </motion.div>
    );
}

export default ServiceFilters
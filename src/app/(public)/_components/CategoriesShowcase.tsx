"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Wrench, Wind, Car, Flower, Home, Hammer, Settings, ArrowRight } from "lucide-react";
import { ICategory } from "@/lib/types";

interface CategoriesShowcaseProps {
    categories: ICategory[];
}

const getCategoryIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("ac") || lowerName.includes("air")) return <Wind className="w-6 h-6" />;
    if (lowerName.includes("plumb")) return <Wrench className="w-6 h-6" />;
    if (lowerName.includes("car")) return <Car className="w-6 h-6" />;
    if (lowerName.includes("garden")) return <Flower className="w-6 h-6" />;
    if (lowerName.includes("clean") || lowerName.includes("home")) return <Home className="w-6 h-6" />;
    if (lowerName.includes("kitchen")) return <Hammer className="w-6 h-6" />;
    return <Settings className="w-6 h-6" />;
};

const CategoriesShowcase = ({ categories }: CategoriesShowcaseProps) => {
    const router = useRouter();

    const handleCategoryClick = (id: number) => {
        router.push(`/services?category_id=${id}`);
    };

    return (
        <section className="py-16 md:py-24 bg-card/40 border-y border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                        Explore Our Categories
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg">
                        Find the right expert for every home maintenance and repair need, from AC tuning to garden care.
                    </p>
                </div>

                {/* Categories Grid */}
                {categories.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        No categories found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                onClick={() => handleCategoryClick(category.id)}
                                className="group relative bg-card hover:bg-accent border border-border hover:border-primary/30 p-6 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-between"
                            >
                                {/* Glowing Background Blur on Hover */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

                                <div className="space-y-4">
                                    {/* Icon Container */}
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                        {getCategoryIcon(category.name)}
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 text-primary text-xs font-semibold mt-6 pt-4 border-t border-border/60">
                                    <span>Browse Services</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CategoriesShowcase;

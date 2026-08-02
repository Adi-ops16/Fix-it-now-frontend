"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Award, Headphones, ShieldCheck } from "lucide-react";

const stats = [
    {
        icon: <Award className="w-6 h-6" />,
        value: "10,000+",
        label: "Jobs Completed",
        description: "Trusted service provided across the country.",
    },
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        value: "99.9%",
        label: "Customer Rating",
        description: "Excellent ratings on feedback loops.",
    },
    {
        icon: <Headphones className="w-6 h-6" />,
        value: "24 / 7",
        label: "Priority Support",
        description: "Always here to guide your booking needs.",
    },
    {
        icon: <ShieldAlert className="w-6 h-6" />,
        value: "100%",
        label: "Stripe Secured",
        description: "Fully protected transactions and deposits.",
    },
];

const StatsSection = () => {
    return (
        <section className="py-16 md:py-24 bg-card/20 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="flex flex-col items-center justify-center p-6 bg-card border border-border/80 rounded-2xl text-center shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            {/* Icon Container */}
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                                {stat.icon}
                            </div>

                            {/* Value */}
                            <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-1">
                                {stat.value}
                            </h3>

                            {/* Label */}
                            <p className="text-sm font-bold text-foreground mb-2">
                                {stat.label}
                            </p>

                            {/* Description */}
                            <p className="text-xs text-muted-foreground leading-relaxed max-w-50">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;

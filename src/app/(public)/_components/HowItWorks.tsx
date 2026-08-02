"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Users, CalendarRange, Wrench } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Choose a Service",
        description: "Browse our diverse list of certified tasks. Pick what needs fixing, cleaning, or styling.",
        icon: <Search className="w-6 h-6" />,
        color: "from-teal-400 to-emerald-500",
    },
    {
        number: "02",
        title: "Select a Technician",
        description: "Compare experience levels, check real customer feedback, and select your preferred expert.",
        icon: <Users className="w-6 h-6" />,
        color: "from-blue-400 to-indigo-500",
    },
    {
        number: "03",
        title: "Schedule & Pay",
        description: "Pick an open time slot that fits your schedule, and pay safely through Stripe integration.",
        icon: <CalendarRange className="w-6 h-6" />,
        color: "from-purple-400 to-pink-500",
    },
    {
        number: "04",
        title: "Get it Fixed",
        description: "Your technician arrives with standard gear to solve the job. Sit back and enjoy the results!",
        icon: <Wrench className="w-6 h-6" />,
        color: "from-amber-400 to-orange-500",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-16 md:py-24 bg-card/20 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                        Hassle-Free Process
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                        How Fix It Now Works
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Get your chores handled in four simple steps. No hidden fees, no phone calls required.
                    </p>
                </div>

                {/* Steps Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connection Line for Desktop */}
                    <div className="hidden lg:block absolute top-11.25 left-[15%] right-[15%] h-0.5 bg-linear-to-r from-primary/10 via-primary/30 to-primary/10 -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col items-center text-center space-y-4 bg-card border border-border/80 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 relative"
                        >
                            {/* Step Badge */}
                            <span className="absolute -top-3 -right-3 text-sm font-black text-muted-foreground/20 group-hover:text-primary/20 transition-colors">
                                {step.number}
                            </span>

                            {/* Icon Container */}
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner">
                                {step.icon}
                            </div>

                            {/* Heading */}
                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

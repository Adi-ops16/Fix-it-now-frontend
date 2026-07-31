"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, CircleDollarSign, CalendarDays, ArrowRight } from "lucide-react";

const TechnicianCTA = () => {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden bg-gradient-to-br from-secondary to-primary/90 text-primary-foreground rounded-3xl p-8 md:p-16 shadow-2xl">
                    {/* Background Ambient Glows */}
                    <div className="absolute top-[-20%] right-[-20%] w-[350px] h-[350px] rounded-full bg-white/10 blur-[80px] pointer-events-none" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-black/10 blur-[60px] pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                        {/* Content */}
                        <div className="lg:col-span-7 space-y-6">
                            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-white/20 text-white px-3.5 py-1 rounded-full">
                                Partner Program
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                                Grow Your Business as a Certified Technician
                            </h2>
                            <p className="text-white/80 text-sm md:text-base max-w-xl">
                                Join the Fix It Now network. Set your own pricing, schedule appointments on your own terms, and connect with hundreds of local homeowners looking for your skillset.
                            </p>

                            {/* Features list */}
                            <div className="space-y-3.5 pt-2">
                                <div className="flex items-center gap-3">
                                    <CircleDollarSign className="w-5 h-5 text-white/90 shrink-0" />
                                    <span className="text-sm font-medium">Set your own hourly rate and pricing parameters</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CalendarDays className="w-5 h-5 text-white/90 shrink-0" />
                                    <span className="text-sm font-medium">Work on your own terms with flexible calendars</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 text-white/90 shrink-0" />
                                    <span className="text-sm font-medium">Secure, reliable payouts directly to your account via Stripe</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA buttons */}
                        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center items-stretch lg:items-end">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto lg:w-3/4"
                            >
                                <Link
                                    href="/be-a-technician"
                                    className="flex items-center justify-center gap-2 w-full px-8 py-4 bg-white text-secondary font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                                >
                                    <span>Become a Technician</span>
                                    <ArrowRight className="w-4 h-4 text-secondary" />
                                </Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto lg:w-3/4"
                            >
                                <Link
                                    href="/services"
                                    className="flex items-center justify-center w-full px-8 py-4 border-2 border-white/30 hover:border-white text-white font-bold rounded-2xl transition-colors"
                                >
                                    Browse Open Jobs
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechnicianCTA;

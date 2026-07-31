"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, MapPin, DollarSign, Star, CheckCircle, Circle } from "lucide-react";
import { ITechnician } from "@/lib/types";

interface TopTechniciansProps {
    technicians: ITechnician[];
}

const TopTechnicians = ({ technicians }: TopTechniciansProps) => {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                        Expert Personnel
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                        Meet Our Top Technicians
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Vetted and certified specialists with top-tier rankings in home improvement, repair, and assistance.
                    </p>
                </div>

                {/* Technicians Grid */}
                {technicians.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        No technicians found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {technicians.map((tech, index) => {
                            const initials = tech.customer?.name
                                ? tech.customer.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .toUpperCase()
                                      .slice(0, 2)
                                : "TC";

                            return (
                                <motion.div
                                    key={tech.user_id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="group relative bg-card border border-border hover:border-primary/20 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                                >
                                    {/* Availability Status Badge */}
                                    <div className="absolute top-4 right-4 z-10">
                                        {tech.is_available ? (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                                <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
                                                Available
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                                <Circle className="w-2 h-2 fill-muted-foreground text-muted-foreground" />
                                                Away
                                            </span>
                                        )}
                                    </div>

                                    {/* Top Profile Card Details */}
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-4">
                                            {/* Photo/Avatar */}
                                            {tech.customer?.photo_url ? (
                                                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-border">
                                                    <Image
                                                        src={tech.customer.photo_url}
                                                        alt={tech.customer.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center border border-primary/20">
                                                    {initials}
                                                </div>
                                            )}

                                            <div>
                                                <div className="flex items-center gap-1">
                                                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                                        {tech.customer?.name || "Technician"}
                                                    </h3>
                                                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                                </div>
                                                <p className="text-xs text-muted-foreground">Certified Expert</p>
                                            </div>
                                        </div>

                                        {/* Bio */}
                                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 italic leading-relaxed">
                                            &ldquo;{tech.bio || "No biography provided yet."}&rdquo;
                                        </p>

                                        {/* Meta Stats Grid */}
                                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/60 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <Briefcase className="w-4 h-4 text-primary shrink-0" />
                                                <span>{tech.experience_year} Years Exp</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4 text-primary shrink-0" />
                                                <span className="capitalize truncate">{tech.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hourly Rate & View services */}
                                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/60">
                                        <div>
                                            <p className="text-[10px] text-muted-foreground uppercase font-semibold">Rate</p>
                                            <div className="flex items-baseline text-foreground">
                                                <span className="text-base font-extrabold">${tech.hourly_rate}</span>
                                                <span className="text-xs text-muted-foreground">/hr</span>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/services?technician_id=${tech.user_id}`}
                                            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-all"
                                        >
                                            View Services
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TopTechnicians;

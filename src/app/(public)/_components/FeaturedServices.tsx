"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Tag, DollarSign, ArrowUpRight, MapPin, CheckCircle2 } from "lucide-react";
import { IService } from "@/lib/types";

interface FeaturedServicesProps {
    services: IService[];
}

const FeaturedServices = ({ services }: FeaturedServicesProps) => {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                    <div className="space-y-3 max-w-2xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                            Highly Requested
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                            Popular Services
                        </h2>
                        <p className="text-muted-foreground text-sm md:text-base">
                            Book top-tier professional services directly on our platform. Fast, vetted, and guaranteed.
                        </p>
                    </div>
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-secondary group transition-colors self-start md:self-auto"
                    >
                        <span>View All Services</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                {/* Grid */}
                {services.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-2xl">
                        No services available at the moment. Check back soon!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="group bg-card border border-border hover:border-primary/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                            >
                                {/* Card Body */}
                                <div className="p-5 space-y-4">
                                    {/* Category badge */}
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground uppercase bg-muted px-2.5 py-1 rounded-md">
                                            <Tag className="w-3 h-3 text-primary" />
                                            {service.category?.name || "General"}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-emerald-500 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Vetted
                                        </span>
                                    </div>

                                    {/* Service Title */}
                                    <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>

                                    {/* Service Description */}
                                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Service Specs */}
                                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                                            <span>{service.estimated_time} mins</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-primary shrink-0 truncate" />
                                            <span className="truncate">{service.location || "On-site"}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer / Price / Action */}
                                <div className="p-5 pt-0 mt-auto flex items-center justify-between bg-muted/20 border-t border-border/40">
                                    <div>
                                        <p className="text-[10px] text-muted-foreground uppercase font-semibold">Service Fee</p>
                                        <div className="flex items-baseline text-foreground">
                                            <span className="text-lg font-extrabold">${service.price}</span>
                                            <span className="text-xs text-muted-foreground ml-0.5">/hr</span>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/services/${service.id}`}
                                        className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedServices;

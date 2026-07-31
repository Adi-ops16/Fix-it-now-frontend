"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Wrench, ShieldCheck, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/services?searchTerms=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push("/services");
        }
    };

    const handleTagClick = (tag: string) => {
        router.push(`/services?searchTerms=${encodeURIComponent(tag)}`);
    };

    return (
        <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-primary/5 via-background to-background">
            {/* Ambient Background Blur */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column - Content */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
                        {/* Sparkle Tag */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Your Ultimate Home Improvement Partner</span>
                        </motion.div>

                        {/* Heading */}
                        <div className="space-y-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]"
                            >
                                Professional Home Services,{" "}
                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Done Right
                                </span>{" "}
                                & On Time.
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-lg text-muted-foreground max-w-xl"
                            >
                                Connect with verified local technicians for plumbing, AC repair, car wash, home cleaning, gardening, and more. Transparent pricing, instant confirmation.
                            </motion.p>
                        </div>

                        {/* Search Bar Form */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            onSubmit={handleSearch}
                            className="relative flex items-center bg-card border border-border p-2 rounded-2xl md:rounded-full shadow-lg max-w-2xl group focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300"
                        >
                            <div className="flex items-center flex-1 px-3">
                                <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                                <input
                                    type="text"
                                    placeholder="What home service do you need today?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-0 outline-none text-foreground placeholder-muted-foreground px-3 py-3 text-sm md:text-base focus:ring-0 focus:outline-none"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="rounded-xl md:rounded-full px-6 py-5 bg-primary text-primary-foreground hover:opacity-90 font-medium"
                            >
                                Search
                            </Button>
                        </motion.form>

                        {/* Popular Keywords */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground"
                        >
                            <span className="font-medium">Popular:</span>
                            {["AC Installation", "Plumbing", "Car wash", "Gardening"].map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => handleTagClick(tag)}
                                    className="px-3 py-1 rounded-full border border-border hover:border-primary hover:text-primary transition-all duration-200"
                                >
                                    {tag}
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column - Decorative Illustration */}
                    <div className="lg:col-span-5 hidden lg:flex justify-center relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative w-full max-w-[420px] aspect-[4/5] bg-card/60 backdrop-blur-md rounded-3xl border border-border/80 shadow-2xl p-6 overflow-hidden flex flex-col justify-between"
                        >
                            {/* Glow behind container */}
                            <div className="absolute -top-12 -left-12 w-40 h-40 bg-primary/20 rounded-full blur-2xl" />
                            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-secondary/20 rounded-full blur-2xl" />

                            {/* Floating Card UI Mockups */}
                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center justify-between pb-4 border-b border-border">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <Wrench className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-foreground">Quick Booking</h4>
                                            <p className="text-xs text-muted-foreground">Certified professionals</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                        Active
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {[
                                        "100% Vetted & Background Checked",
                                        "Instant Booking & Flat Rates",
                                        "Premium Support Guarantee",
                                    ].map((text, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-foreground font-medium">
                                            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                            <span>{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Visual Asset Graphic Card */}
                            <div className="bg-gradient-to-tr from-secondary to-primary/80 text-primary-foreground p-6 rounded-2xl shadow-lg mt-6 relative z-10">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs opacity-80 uppercase tracking-widest font-semibold">Average Rating</p>
                                        <h3 className="text-3xl font-black mt-1">4.9 / 5</h3>
                                    </div>
                                    <ShieldCheck className="w-8 h-8 opacity-90" />
                                </div>
                                <div className="mt-4 flex gap-1 items-center">
                                    <span className="text-xs opacity-90 font-medium">★★★★★ Trusted by 5,000+ Customers</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { toast } from "sonner";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            toast.success(`Subscribed successfully with ${email.trim()}!`);
            setEmail("");
        }
    };

    return (
        <footer className="bg-card border-t border-border mt-auto pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-border">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-block">
                            <Logo size="custom" className="w-32 h-10" />
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                            Your trusted digital partner for quick, vetted local services. From plumbing to tech adjustments, we deliver certified professionals to your doorstep.
                        </p>
                        <div className="flex gap-4 text-muted-foreground">
                            <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                                </svg>
                            </a>
                            <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                            <a href="#" className="hover:text-primary transition-colors" aria-label="GitHub">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">Company</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-primary transition-colors">
                                    Our Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/be-a-technician" className="hover:text-primary transition-colors">
                                    Join As Tech
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Refund Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter and Contact */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="space-y-3">
                            <h4 className="font-bold text-foreground text-sm uppercase tracking-wider flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-primary" />
                                Keep Up To Date
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Join our monthly letter for discounts, tips, and service updates.
                            </p>
                        </div>

                        <form onSubmit={handleSubscribe} className="relative flex items-center bg-background border border-border rounded-xl p-1 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-0 outline-none text-foreground placeholder-muted-foreground px-3 py-2.5 text-xs focus:ring-0 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>

                        <div className="space-y-2.5 text-xs md:text-sm text-muted-foreground pt-2">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary shrink-0" />
                                <span>support@fixitnow.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary shrink-0" />
                                <span>+1 (555) 019-2834</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary shrink-0" />
                                <span>123 Care Street, Suite 500, Dhaka</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Fix-It Now Inc. All rights reserved.</p>
                    <p>Designed with care for homeowners and technicians.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

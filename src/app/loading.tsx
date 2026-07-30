'use client';

import { motion } from 'framer-motion';

export default function Loading() {
    // Animated particles
    const particles = Array.from({ length: 12 }, (_, i) => i);

    // Staggered animation for particles
    const particleVariants = {
        animate: (i: number) => ({
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
            transition: {
                duration: 2,
                delay: (i % 12) * 0.1,
                repeat: Infinity,
            },
        }),
    };

    // Loading bar animation
    const loadingBarVariants = {
        animate: {
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut' as const,
            },
        },
    };

    // Spinning gear animation
    const gearVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: 'linear' as const,
            },
        },
    };

    // Counter animation
    const dotVariants = {
        animate: {
            opacity: [0.3, 1, 0.3],
            transition: {
                duration: 1.5,
                repeat: Infinity,
            },
        },
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center gap-8">
                {/* Animated Logo/Icon Container */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Outer rotating ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Middle pulsing ring */}
                    <motion.div
                        className="absolute inset-4 rounded-full border border-accent"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Inner gear icon */}
                    <motion.div
                        variants={gearVariants}
                        animate="animate"
                        className="text-primary"
                    >
                        <svg
                            className="w-16 h-16"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.592c.55 0 1.02.398 1.11.94m-.213 9.26c.693.464 1.465.776 2.332.776a4.72 4.72 0 002.004-.413M2.781 15.884c-.574-.452-.967-1.11-.967-1.85a2.47 2.47 0 012.497-2.422c.276-.934.782-1.666 1.448-2.032m13.62 0c.666.366 1.172 1.098 1.448 2.032a2.47 2.47 0 012.497 2.422c0 .74-.393 1.398-.967 1.85m-16.734-5.476c-.359.278-.843.455-1.378.455a2.47 2.47 0 01-2.516-2.414m19.758 0a2.47 2.47 0 00-2.516 2.414c-.535 0-1.019-.177-1.378-.455m0 0a4.745 4.745 0 01.95-2.304m0 0a4.745 4.745 0 010 2.304"
                            />
                        </svg>
                    </motion.div>
                </div>

                {/* Loading Text */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                        Loading
                        <motion.span
                            variants={dotVariants}
                            animate="animate"
                            className="inline-block"
                        >
                            .
                        </motion.span>
                        <motion.span
                            variants={dotVariants}
                            animate="animate"
                            transition={{
                                duration: 1.5,
                                delay: 0.2,
                                repeat: Infinity,
                            }}
                            className="inline-block"
                        >
                            .
                        </motion.span>
                        <motion.span
                            variants={dotVariants}
                            animate="animate"
                            transition={{
                                duration: 1.5,
                                delay: 0.4,
                                repeat: Infinity,
                            }}
                            className="inline-block"
                        >
                            .
                        </motion.span>
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Preparing your experience
                    </p>
                </motion.div>

                {/* Animated Progress Bar */}
                <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-linear-to-r from-primary via-accent to-primary rounded-full"
                        variants={loadingBarVariants}
                        animate="animate"
                        style={{ originX: 0 }}
                    />
                </div>

                {/* Bottom Floating Particles */}
                <div className="flex gap-3 justify-center">
                    {particles.slice(0, 5).map((i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={particleVariants}
                            animate="animate"
                            className="w-2 h-2 rounded-full bg-primary/60"
                        />
                    ))}
                </div>

                {/* Status Indicator */}
                <motion.div
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.div
                        className="w-2 h-2 rounded-full bg-accent"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span>Connecting...</span>
                </motion.div>
            </div>

            {/* Background Gradient Orbs */}
            <motion.div
                className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
                animate={{
                    x: [0, 20, 0],
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute bottom-10 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"
                animate={{
                    x: [0, -15, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
}
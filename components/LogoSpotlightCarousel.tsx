'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Organization {
    name: string;
    role: string;
    logoSrc: string;
    url: string;
}

const ORGANIZATIONS: Organization[] = [
    {
        name: 'ESIEA, Paris (France)',
        role: 'RESEARCH INTERN',
        logoSrc: '/images/logos/esiea.webp',
        url: 'https://www.esiea.fr/',
    },
    {
        name: 'IIM, Nagpur (India)',
        role: 'HACKATHON WINNER',
        logoSrc: '/images/logos/iim-nagpur.webp',
        url: 'https://www.iimnagpur.ac.in/',
    },
    {
        name: 'IIIT, Delhi (India)',
        role: 'HACKLLM WINNER',
        logoSrc: '/images/logos/iiit-delhi.webp',
        url: 'https://iiitd.ac.in/',
    },
    {
        name: 'Sakana AI',
        role: 'OPEN SOURCE CONTRIBUTOR',
        logoSrc: '/images/logos/sakana-ai.webp',
        url: 'https://sakana.ai/',
    },
];

export default function LogoSpotlightCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % ORGANIZATIONS.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const current = ORGANIZATIONS[currentIndex];

    return (
        <div className="h-64 relative overflow-hidden flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.a
                    key={current.name}
                    href={current.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-4 absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.4,
                        ease: 'easeInOut',
                    }}
                >
                    {/* Logo */}
                    <div className="h-48 w-auto flex items-center justify-center">
                        <img
                            src={current.logoSrc}
                            alt={current.name}
                            className="h-full w-auto object-contain"
                        />
                    </div>
                </motion.a>
            </AnimatePresence>

            {/* Progress Dots */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
                {ORGANIZATIONS.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 border-2 border-[var(--neo-border)] rounded-full transition-all duration-200 ${idx === currentIndex ? 'bg-primary' : 'bg-white hover:bg-gray-200'
                            }`}
                        aria-label={`Go to ${ORGANIZATIONS[idx].name}`}
                    />
                ))}
            </div>
        </div>
    );
}

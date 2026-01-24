'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { RESUME_DATA } from './constants';

// Notable achievements/facts for ticker
const TICKER_FACTS = [
    "B-SCHOOL WINNER",
    "2X HACKATHON WINNER", 
    "IIM NAGPUR TOP 1",
    "IIIT DELHI 3RD PLACE",
    "ESIEA PARIS INTERN",
    "AI SYSTEMS ENGINEER",
    "SAKANA AI CONTRIBUTOR",
    "VOICE AI SPECIALIST",
    "∞ BUILDING AGENTS",
];

export default function NeoFooter() {
    const currentYear = new Date().getFullYear();

    const socialLinks = RESUME_DATA.contact.links.map(link => ({
        icon: link.icon,
        href: link.url,
        label: link.name
    }));

    return (
        <footer className="mt-auto">
            {/* Hazard Tape Ticker */}
            <div className="bg-[var(--neo-text)] border-y-4 border-primary py-3 overflow-hidden">
                <div className="flex items-center">
                    <div className="flex-shrink-0 px-4 md:px-6">
                        <span className="font-mono text-xs font-black text-primary uppercase tracking-widest">⚠ HAZARD : END OF SITE</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="ticker-scroll flex gap-8 animate-[scroll_30s_linear_infinite] whitespace-nowrap">
                            {[...TICKER_FACTS, ...TICKER_FACTS].map((fact, i) => (
                                <span key={i} className="font-mono text-sm font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                    {fact}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Minimal Footer Bar */}
            <div className="bg-[var(--neo-text)] text-white py-4 px-4 md:px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    
                    {/* Brand + Socials */}
                    <div className="flex items-center gap-4">
                        <span className="text-primary font-black text-2xl">∞</span>
                        <div className="flex items-center gap-2">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-7 h-7 border border-gray-700 flex items-center justify-center hover:border-primary hover:bg-primary hover:text-[var(--neo-text)] transition-all duration-200"
                                    aria-label={label}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            <span className="font-mono text-xs text-gray-400">Available</span>
                        </div>
                        <a
                            href="https://cal.com/ai.pdv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 font-mono text-xs text-primary hover:underline"
                        >
                            Book <ArrowUpRight className="w-3 h-3" />
                        </a>
                    </div>

                    {/* Copyright */}
                    <p className="font-mono text-[10px] text-gray-500">
                        © {currentYear}
                    </p>
                </div>
            </div>
        </footer>
    );
}

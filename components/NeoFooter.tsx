'use client';

import React from 'react';
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
        // make the footer kinda suspended so that it looks like its floating above the grid thus having a gap between the viewport, 
        // and the footer 
        <footer className="mt-auto mb-6">
            {/* Hazard Tape Ticker */}
            <div className="bg-[var(--neo-text)] border-y-4 border-primary py-3 overflow-hidden">
                <div className="flex items-center">
                    <div className="flex-1 overflow-hidden">
                        <div className="ticker-scroll flex gap-10 animate-[scroll_30s_linear_infinite] whitespace-nowrap">
                            {[...TICKER_FACTS, ...TICKER_FACTS].map((fact, i) => (
                                <span key={i} className="font-mono text-sm font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                    {fact}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

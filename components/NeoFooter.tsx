'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { RESUME_DATA } from './constants';

export default function NeoFooter() {
    const [currentTime, setCurrentTime] = useState<string>('');
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const istTime = new Intl.DateTimeFormat('en-IN', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).format(now);
            setCurrentTime(istTime);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);
    }, []);

    const socialLinks = RESUME_DATA.contact.links.map(link => ({
        icon: link.icon,
        href: link.url,
        label: link.name
    }));

    return (
        <footer className="mt-auto border-t-4 border-[var(--neo-border)] bg-[var(--neo-text)] text-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    
                    {/* Brand + Socials */}
                    <div className="flex items-center gap-4 md:gap-6">
                        <span className="bg-primary text-[var(--neo-text)] px-3 py-1 font-black text-lg tracking-tighter">PDV</span>
                        <div className="flex items-center gap-2">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 border-2 border-gray-700 flex items-center justify-center hover:border-primary hover:bg-primary hover:text-[var(--neo-text)] transition-all duration-200"
                                    aria-label={label}
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Status + Time */}
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            <span className="font-mono text-xs text-gray-400">Available</span>
                        </div>
                        <span className="font-mono text-xs text-white font-bold">{currentTime || '--:--'} <span className="text-gray-500">IST</span></span>
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
                        © {currentYear} PDV
                    </p>
                </div>
            </div>
        </footer>
    );
}

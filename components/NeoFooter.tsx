'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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

    const quickLinks = [
        { label: 'About', href: '/about' },
        { label: 'Projects', href: '/projects' },
        { label: 'Resume', href: '/resume' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <footer className="mt-auto border-t-4 border-black bg-black text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">

                    {/* Brand Column - Always visible */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <span className="bg-primary text-black px-3 py-1 font-black text-xl md:text-2xl tracking-tighter">PDV</span>
                            <span className="font-black text-xl md:text-2xl tracking-tight">PRABHUDAYAL<span className="text-primary">_</span></span>
                        </div>
                        <p className="font-mono text-xs md:text-sm text-gray-400 leading-relaxed max-w-md mb-4 md:mb-6 hidden md:block">
                            Full-stack engineer specializing in AI-powered applications,
                            voice interfaces, and brutalist digital experiences.
                        </p>
                        <div className="flex items-center gap-3 md:gap-4">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 md:w-10 md:h-10 border-2 border-gray-700 flex items-center justify-center hover:border-primary hover:bg-primary hover:text-black transition-all duration-200"
                                    aria-label={label}
                                >
                                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links - Hidden on mobile */}
                    <div className="hidden md:block">
                        <h3 className="font-black text-sm uppercase tracking-widest text-primary mb-6">Navigate</h3>
                        <ul className="space-y-3">
                            {quickLinks.map(({ label, href }) => (
                                <li key={label}>
                                    <Link
                                        href={href}
                                        className="font-mono text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-2 h-[2px] bg-gray-600 group-hover:bg-primary group-hover:w-4 transition-all"></span>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Status - Hidden on mobile */}
                    <div className="hidden md:block">
                        <h3 className="font-black text-sm uppercase tracking-widest text-primary mb-6">Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                <span className="font-mono text-sm text-gray-400">Available for work</span>
                            </div>
                            <div className="font-mono text-sm text-gray-500">
                                <span className="text-gray-400">Local Time:</span>
                                <br />
                                <span className="text-white font-bold">{currentTime || '--:--'}</span>
                                <span className="text-gray-500 ml-1">IST</span>
                            </div>
                            <a
                                href="https://cal.com/ai.pdv"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline underline-offset-4"
                            >
                                Book a call <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
                    <p className="font-mono text-[10px] md:text-xs text-gray-500 text-center md:text-left">
                        © {currentYear} PDV. <span className="hidden md:inline">Built with <span className="text-primary">Next.js</span> & <span className="text-primary">Neo-Brutalism</span></span>
                    </p>
                    <div className="flex items-center gap-2 md:gap-4">
                        <span className="font-mono text-[10px] md:text-xs text-white font-bold">{currentTime || '--:--'} <span className="text-gray-500">IST</span></span>
                        <span className="text-gray-600">•</span>
                        <p className="font-mono text-[10px] md:text-xs text-gray-600">
                            Made with <span className="text-primary">❤️</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Mic } from 'lucide-react';

interface NeoNavbarProps {
    onOpenAI: () => void;
}

export default function NeoNavbar({ onOpenAI }: NeoNavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-white border-b-3 border-neo-border">
            <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative">
                <div className="flex items-center justify-between h-16 md:h-20 relative">

                    {/* Left Section: Hamburger (mobile/tablet) + Logo */}
                    <div className="flex items-center gap-3 relative z-10">
                        {/* Hamburger Menu - Mobile & Tablet, on left */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden w-12 h-12 border-3 border-neo-border bg-white flex items-center justify-center shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-secondary transition-all"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        {/* Logo Section - Hidden on smaller screens if needed, or keep visible. Keeping visible on tablet seems fine but user said 'collapse to mobile navbar' which usually implies hamburger. Let's keep logo visible but change main nav breakpoint. */}
                        <Link href="/" className="hidden lg:flex items-center gap-4 group cursor-pointer">
                            <div className="w-14 h-10 border-3 border-neo-border bg-primary flex items-center justify-center shadow-neo-sm group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
                                <span className="font-mono font-bold text-xl text-black">PDV</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Absolutely Centered - Visible only on LG+ */}
                    <div className="hidden lg:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Link
                            href="/"
                            className="px-4 py-2 font-mono text-sm font-bold border-2 border-transparent hover:border-neo-border hover:bg-secondary text-black transition-all uppercase tracking-tight"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="px-4 py-2 font-mono text-sm font-bold border-2 border-transparent hover:border-neo-border hover:bg-secondary text-black transition-all uppercase tracking-tight"
                        >
                            About
                        </Link>
                        <Link
                            href="/projects"
                            className="px-4 py-2 font-mono text-sm font-bold border-2 border-transparent hover:border-neo-border hover:bg-secondary text-black transition-all uppercase tracking-tight"
                        >
                            Selected Works
                        </Link>
                        <Link
                            href="/resume"
                            className="px-4 py-2 font-mono text-sm font-bold border-2 border-transparent hover:border-neo-border hover:bg-secondary text-black transition-all uppercase tracking-tight"
                        >
                            Resume
                        </Link>
                        <Link
                            href="/contact"
                            className="px-4 py-2 font-mono text-sm font-bold border-2 border-transparent hover:border-neo-border hover:bg-secondary text-black transition-all uppercase tracking-tight"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Right Section: AI Button (Desktop) & Mic (Mobile) */}
                    <div className="flex items-center gap-3 relative z-10">
                        {/* Desktop AI Button with Mic Icon */}
                        <button
                            onClick={onOpenAI}
                            className="hidden lg:flex items-center justify-center h-10 px-6 bg-primary text-black font-bold text-sm uppercase tracking-wide btn-neo gap-2"
                        >
                            <Mic className="w-5 h-5" />
                            Talk to my AI Agent
                        </button>
                        {/* Mic Icon - Mobile/Tablet only, rightmost */}
                        <button
                            onClick={onOpenAI}
                            className="lg:hidden w-12 h-12 border-3 border-neo-border bg-primary flex items-center justify-center shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                            aria-label="Talk to AI Agent"
                        >
                            <Mic className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Shows on MD and smaller (since we switched nav to LG) */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b-3 border-neo-border p-4 flex flex-col gap-4 shadow-neo">
                    <Link
                        href="/about"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full py-3 px-4 text-center font-mono font-bold uppercase border-2 border-transparent hover:bg-secondary hover:border-neo-border"
                    >
                        About
                    </Link>
                    <Link
                        href="/projects"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full py-3 px-4 text-center font-mono font-bold uppercase border-2 border-transparent hover:bg-secondary hover:border-neo-border"
                    >
                        Selected Works
                    </Link>
                    <Link
                        href="/resume"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full py-3 px-4 text-center font-mono font-bold uppercase border-2 border-transparent hover:bg-secondary hover:border-neo-border"
                    >
                        Resume
                    </Link>
                    <Link
                        href="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full py-3 px-4 text-center font-mono font-bold uppercase border-2 border-transparent hover:bg-secondary hover:border-neo-border"
                    >
                        Contact
                    </Link>

                </div>
            )}
        </nav>
    );
}

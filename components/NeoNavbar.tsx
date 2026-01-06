'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NeoNavbarProps {
    onOpenAI: () => void;
}

export default function NeoNavbar({ onOpenAI }: NeoNavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-white border-b-3 border-neo-border">
            <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
                <div className="flex items-center justify-between h-20">

                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-4 group cursor-pointer">
                        <div className="size-10 border-3 border-neo-border bg-primary flex items-center justify-center shadow-neo-sm group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
                            <span className="font-mono font-bold text-xl text-black">PDV</span>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tighter uppercase hidden sm:block text-black">
                            Prabhudayal<span className="text-primary">_</span>
                        </h2>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
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

                    {/* Right Section: AI Button & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onOpenAI}
                            className="hidden lg:flex items-center justify-center h-10 px-6 border-3 border-neo-border bg-primary text-black font-bold text-sm uppercase tracking-wide hover:bg-black hover:text-white hover:shadow-neo transition-all active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            Call my assistant
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden border-3 border-neo-border p-2 bg-white hover:bg-primary transition-colors text-black"
                        >
                            <Menu className="w-6 h-6 font-bold" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b-3 border-neo-border p-4 flex flex-col gap-4 shadow-neo">
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
                    <button
                        onClick={() => {
                            onOpenAI();
                            setIsMenuOpen(false);
                        }}
                        className="w-full py-4 border-3 border-neo-border bg-primary text-black font-bold uppercase tracking-wide hover:bg-black hover:text-white transition-all shadow-neo-sm"
                    >
                        Call my assistant
                    </button>
                </div>
            )}
        </nav>
    );
}

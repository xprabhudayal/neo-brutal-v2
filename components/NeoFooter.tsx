'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Github, Linkedin, Instagram, Code2 } from 'lucide-react';
import { RESUME_DATA } from './constants';

export default function NeoFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t-3 border-neo-border bg-white py-12 text-neo-text">
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-end gap-6">

                {/* Left: Branding & Message */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-4xl font-black uppercase tracking-tighter">
                        {RESUME_DATA.name}
                    </h2>
                    <p className="font-mono text-sm max-w-sm">
                        Designed with raw data and pure functionality. No gradients were harmed in the making of this portfolio.
                    </p>
                    <p className="font-mono text-xs text-gray-500">
                        © {currentYear}. ALL RIGHTS RESERVED.
                    </p>
                </div>

                {/* Right: Social Links */}
                <div className="flex gap-4 flex-wrap">
                    {RESUME_DATA.contact.links.map((link) => {
                        // Map icons based on name or use a default if needed (though we import specific ones here)
                        // Ideally we should use the icon from the object, but we need to render it as a component.
                        // Since RESUME_DATA has the component function references, we can use them!
                        const Icon = link.icon;

                        return (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 flex items-center justify-center border-3 border-black bg-white hover:bg-black hover:text-white transition-colors shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                                aria-label={link.name}
                            >
                                <Icon className="w-6 h-6" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
}

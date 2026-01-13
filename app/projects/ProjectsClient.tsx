'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RESUME_DATA } from '@/components/constants';
import { ArrowUpRight, Terminal, Smartphone, ArrowRight, Play } from 'lucide-react';

export default function ProjectsClient() {
    const [filter, setFilter] = useState<'All' | 'Full Stack' | 'AI' | 'Experimental'>('All');

    // Simple keyword mapping for demo purposes. 
    // In a real app, you'd probably add a 'category' field to RESUME_DATA.projects.
    // For now, I'll filter based on tech stack or title keywords.
    const filteredProjects = RESUME_DATA.projects.filter(project => {
        if (filter === 'All') return true;

        const tags = project.tech.map(t => t.toLowerCase());
        const title = project.title.toLowerCase();

        if (filter === 'Full Stack') return tags.some(t => t.includes('react') || t.includes('next') || t.includes('web'));
        if (filter === 'AI') return tags.some(t => t.includes('ai') || t.includes('python') || t.includes('langgraph') || t.includes('gpt'));
        if (filter === 'Experimental') return tags.some(t => t.includes('three') || t.includes('webgl') || t.includes('experimental'));

        return true;
    });

    return (
        <div className="flex-1 w-full bg-neo-bg bg-grid">
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 lg:py-20">
                <div className="mb-16 flex flex-col lg:flex-row gap-8 lg:items-end justify-between relative">
                    <div>
                        <div className="inline-block px-3 py-1 bg-black text-white border-2 border-black font-mono text-xs font-bold uppercase tracking-widest mb-4 shadow-[4px_4px_0px_0px_rgba(57,255,20,1)]">
                            Portfolio 2026
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                            Selected<br />
                            <span className="text-primary relative inline-block terminal-invert">
                                Projects
                            </span>
                        </h1>
                    </div>
                    <div className="font-mono text-lg font-bold border-l-8 border-primary pl-6 max-w-xl py-2 bg-white/50 backdrop-blur-sm">
                        <p>A curated collection of high-performance applications, engineering challenges, and digital experiments. Built with raw code and precision.</p>
                    </div>̉
                </div>

                <div className="mb-12 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-y-4 border-black py-6 bg-white">
                    <div className="flex flex-wrap gap-3">
                        {['All', 'Full Stack', 'AI'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat as any)}
                                className={`px-6 py-2 font-mono text-sm font-black uppercase border-3 border-black transition-all duration-200 ${filter === cat
                                    ? 'bg-black text-primary shadow-none translate-x-[2px] translate-y-[2px]'
                                    : 'bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-secondary'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 font-mono text-sm font-bold bg-black text-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_#39FF14]">
                        <span className="w-3 h-3 bg-primary rounded-full animate-pulse"></span>
                        {filteredProjects.length} PROJECTS DEPLOYED
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 auto-rows-[380px] md:auto-rows-[450px]">
                    {filteredProjects.map((project, index) => {
                        // Asymmetric Grid Pattern
                        // Pattern repeats every 6 items:
                        // 0: Big Feature (4x2)
                        // 1: Vertical (2x2)
                        // 2: Wide (4x1)
                        // 3: Standard (2x1)
                        // 4: Standard (2x1)
                        // 5: Wide (4x1)

                        const patternIndex = index % 6;
                        let colSpan = 'lg:col-span-3'; // Fallback
                        let rowSpan = '';

                        // Apply pattern logic
                        if (index === 0) {
                            // First item always big feature
                            colSpan = 'lg:col-span-4';
                            rowSpan = 'lg:row-span-2';
                        } else if (index === 1) {
                            // Second item always vertical companion
                            colSpan = 'lg:col-span-2';
                            rowSpan = 'lg:row-span-2';
                        } else {
                            // Rotating pattern for rest
                            switch (patternIndex) {
                                case 2: colSpan = 'lg:col-span-4'; break;
                                case 3: colSpan = 'lg:col-span-2'; break;
                                case 4: colSpan = 'lg:col-span-2'; break;
                                case 5: colSpan = 'lg:col-span-4'; break;
                                default: colSpan = 'lg:col-span-3'; break; // Should not happen with mod 6
                            }
                        }

                        // Special case: if we have odd number of items at the end, make last one full width or balanced
                        if (index === filteredProjects.length - 1 && filteredProjects.length % 2 !== 0) {
                            colSpan = 'lg:col-span-6';
                        }

                        // Featured/Vertical cards span 2 rows (900px + gap)
                        const isTall = rowSpan === 'lg:row-span-2';

                        return (
                            <article key={project.title} className={`${colSpan} ${rowSpan} neo-brutal-box flex flex-col group relative overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300`}>
                                {index === 0 && (
                                    <div className="absolute top-0 right-0 bg-primary border-l-4 border-b-4 border-black px-6 py-2 font-mono font-black text-sm uppercase z-20">
                                        Featured
                                    </div>
                                )}

                                {/* Image Section - 2/3 Height */}
                                <div className={`relative w-full h-[65%] ${isTall ? 'lg:h-[75%]' : ''} border-b-4 border-black overflow-hidden bg-gray-100`}>
                                    {/* Placeholder pattern if no image */}
                                    <div className="absolute inset-0 pattern-diagonal opacity-10"></div>

                                    {project.image ? (
                                        <div className="w-full h-full relative">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover img-bw-to-color transition-all duration-500"
                                            />
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Terminal className="w-20 h-20 text-gray-400 group-hover:text-primary transition-colors" />
                                        </div>
                                    )}
                                </div>

                                {/* Text Section - 1/3 Height */}
                                <div className={`p-4 sm:p-6 flex flex-col gap-3 relative z-10 bg-white w-full h-[35%] ${isTall ? 'lg:h-[25%]' : ''} justify-between`}>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.slice(0, 3).map(t => (
                                            <span key={t} className="px-2 py-1 bg-secondary border-2 border-black font-mono text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_#000]">{t}</span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className={`font-black uppercase tracking-tight group-hover:text-black transition-colors ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'} line-clamp-2 leading-tight`}>
                                            {project.title}
                                        </h3>
                                        {project.url && (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-shrink-0 flex items-center justify-center w-10 h-10 border-3 border-black bg-white hover:bg-black hover:text-primary transition-all rounded-none shadow-[4px_4px_0px_0px_#000] hover:shadow-none"
                                            >
                                                <ArrowUpRight className="font-bold w-5 h-5" />
                                            </a>
                                        )}
                                    </div>

                                    <p className="font-mono text-xs leading-relaxed text-gray-700 line-clamp-2 hidden md:block">
                                        {project.description}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section >
        </div >
    );
}

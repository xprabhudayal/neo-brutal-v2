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
                        <div className="inline-block px-3 py-1 bg-black text-white border-2 border-black font-mono text-xs font-bold uppercase tracking-widest mb-4">
                            Portfolio 2026
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                            Selected<br />
                            <span className="text-primary relative inline-block">
                                Projects
                                <svg className="absolute -bottom-2 w-full h-3 text-black" preserveAspectRatio="none" viewBox="0 0 100 10">
                                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3"></path>
                                </svg>
                            </span>
                        </h1>
                    </div>
                    <div className="font-mono text-lg font-bold border-l-8 border-primary pl-6 max-w-xl py-2 bg-white/50 backdrop-blur-sm">
                        <p>A curated collection of high-performance applications, engineering challenges, and digital experiments. Built with raw code and precision.</p>
                    </div>
                </div>

                <div className="mb-10 flex flex-wrap gap-4 items-center justify-between border-y-3 border-neo-border py-4 bg-white">
                    <div className="flex gap-2 px-4 overflow-x-auto pb-2 md:pb-0">
                        {['All', 'Full Stack', 'AI'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat as any)}
                                className={`px-4 py-2 font-mono text-xs font-bold uppercase btn-neo ${filter === cat
                                    ? 'bg-black text-white hover:bg-primary hover:text-black'
                                    : 'bg-white text-black hover:text-black hover:bg-secondary'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="px-4 flex items-center gap-2 font-mono text-xs font-bold">
                        <span className="w-3 h-3 bg-primary border-2 border-black rounded-full animate-pulse"></span>
                        {filteredProjects.length} PROJECTS DEPLOYED
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 auto-rows-[minmax(350px,auto)]">
                    {filteredProjects.map((project, index) => {
                        // Creating a pseudo-random layout pattern based on index
                        const isFeatured = index === 0; // First project is big feature
                        const isVertical = index === 1; // Second is vertical card

                        let colSpan = 'lg:col-span-3'; // Default
                        let rowSpan = '';

                        if (isFeatured) {
                            colSpan = 'lg:col-span-4';
                            rowSpan = 'lg:row-span-2';
                        } else if (isVertical) {
                            colSpan = 'lg:col-span-2';
                            rowSpan = 'lg:row-span-2';
                        }

                        return (
                            <article key={project.title} className={`${colSpan} ${rowSpan} neo-brutal-box flex flex-col group relative overflow-hidden`}>
                                {isFeatured && (
                                    <div className="absolute top-0 right-0 bg-primary border-l-3 border-b-3 border-black px-4 py-2 font-mono font-bold text-xs uppercase shadow-neo z-20">
                                        Featured Case Study
                                    </div>
                                )}

                                <div className={`relative flex-1 min-h-[${isFeatured ? '300px' : '200px'}] border-b-3 border-neo-border overflow-hidden bg-gray-100`}>
                                    {/* Placeholder pattern if no image */}
                                    <div className="absolute inset-0 pattern-diagonal opacity-10"></div>

                                    {project.image ? (
                                        <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity" />
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Terminal className="w-20 h-20 text-gray-400 group-hover:text-primary transition-colors" />
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 md:p-8 bg-white flex flex-col gap-4 relative z-10 flex-grow">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.slice(0, 3).map(t => (
                                            <span key={t} className="px-2 py-1 bg-secondary border-2 border-black font-mono text-[10px] font-bold uppercase">{t}</span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-start">
                                        <h3 className={`font-black uppercase tracking-tight group-hover:text-primary transition-colors ${isFeatured ? 'text-3xl md:text-5xl' : 'text-2xl'}`}>
                                            {project.title}
                                        </h3>
                                        {project.url && (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center w-10 h-10 border-3 border-black bg-white hover:bg-black hover:text-primary transition-colors rounded-full"
                                            >
                                                <ArrowUpRight className="font-bold w-5 h-5" />
                                            </a>
                                        )}
                                    </div>

                                    <p className="font-mono text-sm leading-relaxed text-gray-700 max-w-2xl">
                                        {project.description}
                                    </p>

                                    {isVertical && (
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-auto w-full py-3 border-3 border-black bg-primary text-center font-bold uppercase text-sm hover:bg-black hover:text-white transition-all shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                                        >
                                            View Project
                                        </a>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

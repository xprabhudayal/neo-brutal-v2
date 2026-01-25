'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RESUME_DATA } from '@/components/constants';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { motion } from '@/components/motion-client';

export default function ProjectsClient() {
    const [filter, setFilter] = useState<'All' | 'Full Stack' | 'AI' | 'Experimental'>('All');

    const filteredProjects = RESUME_DATA.projects.filter(project => {
        if (filter === 'All') return true;

        const tags = project.tech.map(t => t.toLowerCase());

        if (filter === 'Full Stack') return tags.some(t => t.includes('react') || t.includes('next') || t.includes('web'));
        if (filter === 'AI') return tags.some(t => t.includes('ai') || t.includes('python') || t.includes('langgraph') || t.includes('gpt'));
        if (filter === 'Experimental') return tags.some(t => t.includes('three') || t.includes('webgl') || t.includes('experimental'));

        return true;
    });

    return (
        <div className="flex-1 w-full bg-grid">
            <section className="w-full py-8 lg:py-12">
                {/* Header - Full width with padding */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-6 lg:items-end justify-between">
                        <div>
                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                className="inline-block px-3 py-1 bg-[var(--neo-text)] text-white border-2 border-[var(--neo-border)] font-mono text-xs font-bold uppercase tracking-widest mb-4 shadow-neo-primary"
                            >
                                Portfolio 2026
                            </motion.div>
                            <motion.h1 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85]"
                            >
                                Selected<br />
                                <span className="text-primary relative inline-block terminal-invert">
                                    Projects
                                </span>
                            </motion.h1>
                        </div>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: 0.2 }}
                            className="font-mono text-base font-bold border-l-8 border-primary pl-6 max-w-xl py-2"
                        >
                            <p>A curated collection of high-performance applications, engineering challenges, and digital experiments.</p>
                        </motion.div>
                    </div>
                </div>

                {/* Filters - Full width border */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.3 }}
                    className="border-y-4 border-[var(--neo-border)] py-4 bg-white mb-8"
                >
                    <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {['All', 'Full Stack', 'AI'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat as any)}
                                    className={`px-4 py-1.5 font-mono text-xs font-black uppercase border-2 border-[var(--neo-border)] transition-all duration-200 ${filter === cat
                                        ? 'bg-[var(--neo-text)] text-primary'
                                        : 'bg-white text-[var(--neo-text)] hover:bg-secondary'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        
                    </div>
                </motion.div>

                {/* Projects Grid - 2 columns, larger cards */}
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        {filteredProjects.map((project, index) => (
                            <motion.article 
                                key={project.title}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                                className={`neo-brutal-box flex flex-col group relative overflow-hidden border-3 border-[var(--neo-border)] bg-white shadow-neo hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-300 h-full ${
                                    index % 3 === 0 ? 'lg:col-span-2' : 'lg:col-span-1'
                                }`}
                            >
                                {index === 0 && (
                                    <div className="absolute top-0 right-0 bg-primary border-l-3 border-b-3 border-[var(--neo-border)] px-4 py-2 font-mono font-black text-xs uppercase z-20">
                                        Featured
                                    </div>
                                )}

                                {/* Image Section - Larger height */}
                                <div className="relative w-full h-64 md:h-80 border-b-3 border-[var(--neo-border)] overflow-hidden bg-gray-100">
                                    <div className="absolute inset-0 pattern-diagonal opacity-10"></div>

                                    {project.image ? (
                                        <div className="w-full h-full relative">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                                className="object-cover img-bw-to-color transition-all duration-500"
                                            />
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Terminal className="w-16 h-16 text-gray-400 group-hover:text-primary transition-colors" />
                                        </div>
                                    )}
                                </div>

                                {/* Text Section */}
                                <div className="p-6 md:p-8 flex flex-col gap-4 relative z-10 bg-white flex-1">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.slice(0, 3).map(t => (
                                            <span key={t} className="px-2 py-1 bg-secondary border border-[var(--neo-border)] font-mono text-[10px] font-black uppercase shadow-neo-sm">{t}</span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className="font-black uppercase tracking-tight text-xl md:text-2xl leading-none">
                                            {project.title}
                                        </h3>
                                        {project.url && (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-shrink-0 flex items-center justify-center w-10 h-10 border-2 border-[var(--neo-border)] bg-white hover:bg-[var(--neo-text)] hover:text-primary transition-all shadow-neo-sm hover:shadow-none"
                                            >
                                                <ArrowUpRight className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>

                                    <p className="font-mono text-xs leading-relaxed text-gray-600">
                                        {project.description}
                                    </p>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

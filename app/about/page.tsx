'use client';

import { RESUME_DATA } from "@/components/constants";
import { User, Mail, Layers, Gamepad2, Globe, ArrowUpRight, Github, Linkedin, Twitter, Rocket } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';

export default function AboutPage() {
    const { name, summary, contact } = RESUME_DATA;

    // Animation Variants - Pure Fade, No Movement/Scaling
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { duration: 0.5, ease: "easeOut" as const } 
        }
    };

    return (
        <div className="flex-1 w-full bg-grid">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* Sidebar */}
                <aside className="hidden lg:block lg:col-span-3 sticky top-28">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        viewport={{ once: true, amount: 0.5 }}
                        className="flex flex-col gap-6"
                    >
                        <motion.div variants={itemVariants} className="border-3 border-neo-border bg-white p-6 shadow-neo">
                            <div className="w-full aspect-square border-3 border-neo-border mb-4 overflow-hidden relative bg-secondary">
                                {/* Fallback to simple icon since we might not have a square avatar ready, or use the one from home */}
                                <Image
                                    src="/profile-photo.webp"
                                    alt={name}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 25vw"
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                                    priority
                                />
                            </div>
                            <h1 className="font-bold text-xl uppercase leading-none mb-1">{name}</h1>
                            <p className="font-mono text-xs text-gray-600 mb-4">AI Engineer & Full Stack</p>
                        </motion.div>

                        <motion.nav variants={itemVariants} className="border-3 border-neo-border bg-white p-0 shadow-neo flex flex-col">
                            <div className="bg-black text-white p-3 border-b-3 border-neo-border">
                                <h3 className="font-mono text-xs uppercase tracking-widest">About.exe</h3>
                            </div>
                            <a className="px-4 py-3 border-b-2 border-gray-100 hover:bg-primary hover:border-black hover:border-b-2 font-mono text-sm font-bold flex items-center gap-2 group transition-colors" href="#bio">
                                <User className="w-5 h-5" />
                                <span>_BIO</span>
                            </a>
                            <a className="px-4 py-3 border-b-2 border-gray-100 hover:bg-primary hover:border-black hover:border-b-2 font-mono text-sm font-bold flex items-center gap-2 group transition-colors" href="#stack">
                                <Layers className="w-5 h-5" />
                                <span>_EXPERTISE</span>
                            </a>
                            <a className="px-4 py-3 hover:bg-primary hover:border-black font-mono text-sm font-bold flex items-center gap-2 group transition-colors" href="#offline">
                                <Gamepad2 className="w-5 h-5" />
                                <span>_OFFLINE</span>
                            </a>
                        </motion.nav>
                    </motion.div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-9 flex flex-col gap-12">
                    {/* Bio Section */}
                    <motion.section 
                        initial="hidden"
                        whileInView="visible"
                        variants={containerVariants}
                        viewport={{ once: true, amount: 0.5 }}
                        className="border-3 border-neo-border bg-white p-6 md:p-12 shadow-neo relative overflow-hidden" 
                        id="bio"
                    >
                        <div className="absolute -right-10 -top-10 text-[120px] md:text-[180px] text-gray-100 font-black select-none pointer-events-none z-0">?</div>
                        <div className="relative z-10">
                            {/* Mobile User Info (since sidebar is hidden) */}
                            <motion.div variants={itemVariants} className="lg:hidden flex items-center gap-4 mb-8 pb-6 border-b-2 border-dashed border-gray-200">
                                <div className="w-16 h-16 border-3 border-neo-border overflow-hidden bg-secondary relative shrink-0">
                                    <Image 
                                        src="/profile-photo.webp" 
                                        alt={name} 
                                        fill
                                        sizes="64px"
                                        className="object-cover grayscale" 
                                    />
                                </div>
                                <div>
                                    <h1 className="font-bold text-lg uppercase leading-none mb-1">{name}</h1>
                                    <p className="font-mono text-[10px] text-gray-600">AI Engineer & Full Stack</p>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="inline-block px-3 py-1 bg-primary border-2 border-black font-mono text-[10px] md:text-xs mb-4 md:mb-6 uppercase tracking-widest font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                Status: Online
                            </motion.div>
                            <motion.h1 variants={itemVariants} className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                                Hello 🤝 <span className="bg-black terminal-invert">World</span>
                            </motion.h1>
                            <div className="prose prose-lg max-w-3xl">
                                <motion.p variants={itemVariants} className="font-mono text-sm md:text-xl leading-relaxed mb-6 border-l-4 border-black pl-4 md:pl-6 bg-secondary p-3 md:p-4">
                                    I am {name}, a multidisciplinary engineer obsessed with AI agents, Agentic Systems, and raw performance.
                                </motion.p>
                                <motion.p variants={itemVariants} className="font-display font-medium text-lg text-gray-800 mb-4 whitespace-pre-wrap">
                                    {summary}
                                </motion.p>
                                <motion.hr variants={itemVariants} className="my-6" />
                                <motion.p variants={itemVariants} className="font-display text-gray-600 mb-0">
                                    I don't just write software; I build digital environments that respect the user's intelligence and solve complex problems with elegant, robust code.
                                </motion.p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Focus Areas */}
                    <motion.section 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={containerVariants}
                        className="flex flex-col gap-6" 
                        id="stack"
                    >
                        <motion.div variants={itemVariants} className="flex items-center gap-4">
                            <div className="h-8 w-8 bg-black flex items-center justify-center text-white">
                                <Layers className="w-5 h-5" />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tight">Focus Areas</h2>
                            <div className="h-1 flex-1 bg-black"></div>
                        </motion.div>
                        <motion.div variants={itemVariants} className="border-3 border-neo-border bg-white shadow-neo">
                            <div className="grid grid-cols-1 md:grid-cols-3 divide-y-3 md:divide-y-0 md:divide-x-3 divide-neo-border">
                                {/* Area 1 */}
                                <motion.div 
                                    variants={itemVariants}
                                    className="p-6 md:p-8 hover:bg-secondary transition-colors"
                                >
                                    <h4 className="font-mono font-bold text-black bg-primary inline-block px-2 border-2 border-black mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">01.</h4>
                                    <h3 className="text-xl font-bold uppercase mb-4 mt-2">AI Agents</h3>
                                    <p className="text-sm font-medium text-gray-600 mb-4">Building autonomous systems that think and act.</p>
                                    <ul className="text-sm font-mono list-disc list-inside space-y-1 marker:text-primary">
                                        <li>LangChain / LangGraph</li>
                                        <li>RAG Pipelines</li>
                                        <li>Multi-Agent Systems</li>
                                    </ul>
                                </motion.div>
                                {/* Area 2 */}
                                <motion.div 
                                    variants={itemVariants}
                                    className="p-6 md:p-8 hover:bg-secondary transition-colors"
                                >
                                    <h4 className="font-mono font-bold text-black bg-primary inline-block px-2 border-2 border-black mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">02.</h4>
                                    <h3 className="text-xl font-bold uppercase mb-4 mt-2">Full Stack</h3>
                                    <p className="text-sm font-medium text-gray-600 mb-4">End-to-end application development with modern stacks.</p>
                                    <ul className="text-sm font-mono list-disc list-inside space-y-1 marker:text-primary">
                                        <li>Next.js / React</li>
                                        <li>Python / FastAPI</li>
                                        <li>PostgreSQL / Supabase</li>
                                    </ul>
                                </motion.div>
                                {/* Area 3 */}
                                <motion.div 
                                    variants={itemVariants}
                                    className="p-6 md:p-8 hover:bg-secondary transition-colors"
                                >
                                    <h4 className="font-mono font-bold text-black bg-primary inline-block px-2 border-2 border-black mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">03.</h4>
                                    <h3 className="text-xl font-bold uppercase mb-4 mt-2">Architecture</h3>
                                    <p className="text-sm font-medium text-gray-600 mb-4">Designing systems that scale and survive.</p>
                                    <ul className="text-sm font-mono list-disc list-inside space-y-1 marker:text-primary">
                                        <li>Microservices</li>
                                        <li>Event-Driven Design</li>
                                        <li>Cloud Native</li>
                                    </ul>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.section>

                    {/* Offline Mode - Keeping fun/placeholder elements but adapting slightly */}
                    <motion.section 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={containerVariants}
                        className="flex flex-col gap-6" 
                        id="offline"
                    >
                        <motion.div variants={itemVariants} className="flex items-center gap-4">
                            <div className="h-8 w-8 bg-black flex items-center justify-center text-white">
                                <Gamepad2 className="w-5 h-5" />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tight">Offline Mode</h2>
                            <div className="h-1 flex-1 bg-black"></div>
                        </motion.div>
                        <motion.div variants={itemVariants} className="bg-white border-3 border-neo-border p-8 shadow-neo">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <motion.div 
                                    variants={itemVariants}
                                    className="flex flex-col gap-2 p-4 border-2 border-dashed border-gray-300 bg-secondary/30 hover:bg-secondary hover:border-black transition-all"
                                >
                                    <span className="font-mono text-xs font-bold uppercase text-gray-500">Current Focus</span>
                                    <div className="font-bold text-lg leading-tight">AGI Research</div>
                                    <span className="text-xs bg-black text-white px-2 py-1 w-max">Deep Learning</span>
                                </motion.div>
                                <motion.div 
                                    variants={itemVariants}
                                    className="flex flex-col gap-2 p-4 border-2 border-dashed border-gray-300 bg-secondary/30 hover:bg-secondary hover:border-black transition-all"
                                >
                                    <span className="font-mono text-xs font-bold uppercase text-gray-500">Code Editor</span>
                                    <div className="font-bold text-lg leading-tight">VS Code</div>
                                    <span className="text-xs bg-primary text-black border border-black px-2 py-1 w-max font-bold">Neo Vim Mode</span>
                                </motion.div>
                                <motion.div 
                                    variants={itemVariants}
                                    className="flex flex-col gap-2 p-4 border-2 border-dashed border-gray-300 bg-secondary/30 hover:bg-secondary hover:border-black transition-all"
                                >
                                    <span className="font-mono text-xs font-bold uppercase text-gray-500">Learning</span>
                                    <div className="font-bold text-lg leading-tight">Rust</div>
                                    <span className="text-xs bg-white border border-black text-black px-2 py-1 w-max">Systems</span>
                                </motion.div>
                                <motion.div 
                                    variants={itemVariants}
                                    className="flex flex-col gap-2 p-4 border-2 border-dashed border-gray-300 bg-secondary/30 hover:bg-secondary hover:border-black transition-all"
                                >
                                    <span className="font-mono text-xs font-bold uppercase text-gray-500">Location</span>
                                    <div className="font-bold text-lg leading-tight">India</div>
                                    <span className="text-xs bg-gray-200 border border-gray-400 text-black px-2 py-1 w-max">IST (UTC+5:30)</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.section>

                    {/* CTA */}
                    <motion.section 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={containerVariants}
                        className="mt-8 bg-secondary border-3 border-neo-border p-10 text-center shadow-neo"
                    >
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-black uppercase mb-4 tracking-tighter">Ready to build something robust?</motion.h2>
                        <motion.p variants={itemVariants} className="font-mono font-bold mb-8 max-w-xl mx-auto">I am currently open to new opportunities. Let's discuss architecture, agents, or the singularity.</motion.p>
                        <motion.div variants={itemVariants}>
                            <Link
                                href="/contact"
                                className="inline-block bg-primary text-black px-8 py-4 font-bold text-lg uppercase tracking-widest btn-neo hover:bg-black hover:text-white"
                            >
                                Initiate Contact
                            </Link>
                        </motion.div>
                    </motion.section>
                </main>
            </div>
        </div>
    </div>
    );
}

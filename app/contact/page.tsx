"use client";

import { RESUME_DATA } from "@/components/constants";
import { Mail, Clock, MapPin, ArrowUpRight, Github, Linkedin, Twitter, Rocket, Globe } from "lucide-react";
import { motion } from "@/components/motion-client";

export default function ContactPage() {
    const { contact } = RESUME_DATA;

    return (
        <div className="flex-1 w-full bg-grid">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 md:py-16 pb-32">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="mb-12"
                >
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                        Get In <span className="text-primary terminal-invert inline-block relative">Touch</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">

                    {/* Availability Card */}
                    <motion.section 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.1 }}
                        className="col-span-12 md:col-span-7 lg:col-span-8 neo-brutal-box border-neo-border bg-white text-neo-text p-6 md:p-10 shadow-neo flex flex-col justify-between relative overflow-hidden group hover:shadow-neo-hover-lg hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                            <Rocket className="w-24 h-24 md:w-32 md:h-32 text-[var(--neo-text)]" />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-3 border-3 border-[var(--neo-border)] px-3 py-1 mb-6 bg-secondary w-fit">
                                <span className="w-3 h-3 bg-primary border-2 rounded-full border-[var(--neo-border)] animate-[pulse_1s_ease-in-out_infinite]"></span>
                                <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-[var(--neo-text)]">Live Status</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight mb-2">Available for<br />New Projects</h2>
                        </div>
                        <div className="flex flex-col gap-6 mt-8 relative z-10 border-t-3 border-[var(--neo-text)]/10 pt-6">
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                <div>
                                    <p className="font-mono text-xs md:text-sm text-gray-500 uppercase tracking-widest mb-2">Current Capacity</p>
                                    <p className="font-bold text-lg sm:text-xl inline-block bg-primary px-3 py-1 border-2 border-[var(--neo-border)] shadow-neo-sm">OPEN / FREELANCE</p>
                                </div>
                                <div className="text-left sm:text-right">
                                    <p className="font-mono text-[10px] md:text-xs text-gray-500 uppercase">LOCATION: BANGALORE, INDIA</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Direct Contact Card */}
                    <motion.a 
                        href={`mailto:${contact.email}`} 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2 }}
                        className="col-span-12 md:col-span-5 lg:col-span-4 neo-brutal-box border-neo-border bg-primary p-6 md:p-10 shadow-neo flex flex-col relative group hover:shadow-neo-hover-lg hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black uppercase tracking-tight">Direct<br />Contact</h2>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--neo-text)] text-white flex items-center justify-center border-3 border-transparent group-hover:bg-white group-hover:text-[var(--neo-text)] group-hover:border-[var(--neo-border)] transition-all">
                                <Mail className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                        </div>
                        <div className="mt-auto space-y-6">
                            <div>
                                <p className="font-mono text-xs font-bold uppercase mb-2 opacity-80">Primary Email</p>
                                <span className="text-lg sm:text-xl md:text-2xl font-bold break-all group-hover:bg-[var(--neo-text)] group-hover:text-white px-1 -mx-1 transition-colors decoration-4 underline-offset-4 underline">
                                    {contact.email}
                                </span>
                            </div>
                            <div className="bg-white p-4 border-3 border-[var(--neo-border)] shadow-neo">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-mono text-[10px] sm:text-xs font-bold uppercase">Response Time</span>
                                </div>
                                <p className="font-bold text-sm sm:text-base">Usually within 24 hours</p>
                            </div>
                        </div>
                    </motion.a>

                    {/* Social Grid Header */}
                    <motion.section 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.3 }}
                        className="col-span-12 neo-brutal-box border-neo-border bg-secondary p-6 md:p-10 shadow-neo group hover:shadow-neo-hover-lg hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b-3 border-[var(--neo-border)] pb-6">
                            <div className="flex items-center gap-4">
                                <Globe className="w-8 h-8 md:w-10 md:h-10 bg-[var(--neo-text)] text-white p-1.5 md:p-2 border-2 border-[var(--neo-border)]" />
                                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Social Grid</h2>
                            </div>
                            <p className="font-mono text-xs md:text-sm max-w-md">Connect across platforms. I share code, design thoughts, and experimental AI agents.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                            {contact.links.filter(link => link.name !== "Email").map((link) => {
                                const Icon = link.icon || ArrowUpRight;
                                return (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-4 bg-white hover:bg-primary hover:text-[var(--neo-text)] btn-neo group/card h-full w-full text-left flex flex-col justify-between min-h-[140px]"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <Icon className="w-6 h-6 md:w-8 md:h-8" />
                                            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover/card:opacity-100 transition-opacity -translate-y-1 translate-x-1" />
                                        </div>
                                        <div>
                                            <span className="font-bold font-mono text-base md:text-lg block mb-1">{link.name}</span>
                                            <span className="text-[10px] md:text-xs font-mono opacity-60 block">
                                                {link.name === 'LinkedIn' ? 'Professional' :
                                                    link.name === 'GitHub' ? 'Code Repos' :
                                                        link.name === 'Twitter' ? 'Thoughts' :
                                                            link.name === 'Instagram' ? 'Social' :
                                                                link.name === 'LeetCode' ? 'Coding' :
                                                                    'Connect'}
                                            </span>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </motion.section>
                </div>
            </div>
        </div>
    );
}

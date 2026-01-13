import { RESUME_DATA } from "@/components/constants";
import { Mail, Clock, MapPin, ArrowUpRight, Github, Linkedin, Twitter, Rocket, Globe } from "lucide-react";

export default function ContactPage() {
    const { contact } = RESUME_DATA;



    return (
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8 md:py-16 bg-grid">
            <div className="mb-12">
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                    Get In <span className="text-primary terminal-invert inline-block relative">Touch</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">

                {/* Availability Card */}
                <section className="col-span-12 md:col-span-7 lg:col-span-8 neo-brutal-box border-neo-border bg-white text-neo-text p-8 md:p-10 shadow-neo flex flex-col justify-between relative overflow-hidden group hover:shadow-neo-hover-lg hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <Rocket className="w-32 h-32 text-black" />
                    </div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-3 border-3 border-black px-3 py-1 mb-6 bg-secondary w-fit">
                            <span className="w-3 h-3 bg-primary border-2 rounded-full border-black animate-[pulse_1s_ease-in-out_infinite]"></span>
                            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black">Live Status</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-2">Available for<br />New Projects</h2>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-8 relative z-10 border-t-3 border-black/10 pt-6">
                        <div>
                            <p className="font-mono text-sm text-gray-500 uppercase tracking-widest mb-1">Current Capacity</p>
                            <p className="font-bold text-xl inline-block bg-primary px-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">OPEN / FREELANCE</p>
                        </div>
                        <div className="text-right">
                            <p className="font-mono text-xs text-gray-500">LOCATION: BANGALORE, INDIA</p>
                        </div>
                    </div>
                </section>

                {/* Direct Contact Card */}
                <section className="col-span-12 md:col-span-5 lg:col-span-4 neo-brutal-box border-neo-border bg-primary p-8 md:p-10 shadow-neo flex flex-col relative group hover:shadow-neo-hover-lg hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black uppercase tracking-tight">Direct<br />Contact</h2>
                        <div className="w-12 h-12 bg-black text-white flex items-center justify-center border-3 border-transparent group-hover:bg-white group-hover:text-black group-hover:border-black transition-all">
                            <Mail className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-auto space-y-6">
                        <div>
                            <p className="font-mono text-xs font-bold uppercase mb-2 opacity-80">Primary Email</p>
                            <a className="text-xl md:text-2xl font-bold break-all hover:bg-black hover:text-white px-1 -mx-1 transition-colors decoration-4 underline-offset-4" href={`mailto:${contact.email}`}>
                                {contact.email}
                            </a>
                        </div>
                        <div className="bg-white p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-4 h-4" />
                                <span className="font-mono text-xs font-bold uppercase">Response Time</span>
                            </div>
                            <p className="font-bold">Usually within 24 hours</p>
                        </div>
                    </div>
                </section>

                {/* Social Grid Header */}
                <section className="col-span-12 neo-brutal-box border-neo-border bg-secondary p-8 md:p-10 shadow-neo group hover:shadow-neo-hover-lg hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b-3 border-black pb-6">
                        <div className="flex items-center gap-4">
                            <Globe className="w-10 h-10 bg-black text-white p-2 border-2 border-black" />
                            <h2 className="text-3xl font-black uppercase tracking-tight">Social Grid</h2>
                        </div>
                        <p className="font-mono text-sm max-w-md">Connect across platforms. I share code, design thoughts, and experimental AI agents.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {contact.links.map((link) => {
                            const Icon = link.icon || ArrowUpRight;
                            return (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-5 bg-white hover:bg-primary hover:text-black btn-neo group/card h-full w-full text-left"
                                >
                                    <div className="flex justify-between items-start mb-8">
                                        <Icon className="w-8 h-8" />
                                        <ArrowUpRight className="w-6 h-6 opacity-0 group-hover/card:opacity-100 transition-opacity -translate-y-1 translate-x-1" />
                                    </div>
                                    <span className="font-bold font-mono text-lg block">{link.name}</span>
                                    <span className="text-xs font-mono opacity-60">
                                        {link.name === 'LinkedIn' ? 'Professional' :
                                            link.name === 'GitHub' ? 'Code Repos' :
                                                link.name === 'Twitter' ? 'Thoughts' :
                                                    link.name === 'Instagram' ? 'Social' :
                                                        link.name === 'LeetCode' ? 'Coding' :
                                                            'Connect'}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}

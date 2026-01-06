import { RESUME_DATA } from "@/components/constants";
import { User, Mail, Layers, Gamepad2, Globe, ArrowUpRight, Github, Linkedin, Twitter, Rocket } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const { name, summary, contact } = RESUME_DATA;

    return (
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* Sidebar */}
                <aside className="hidden lg:block lg:col-span-3 sticky top-28">
                    <div className="flex flex-col gap-6">
                        <div className="border-3 border-neo-border bg-white p-6 shadow-neo">
                            <div className="w-full aspect-square border-3 border-neo-border mb-4 overflow-hidden relative bg-secondary">
                                {/* Fallback to simple icon since we might not have a square avatar ready, or use the one from home */}
                                <img
                                    src="/profile-photo.webp"
                                    alt={name}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                            <h1 className="font-bold text-xl uppercase leading-none mb-1">{name}</h1>
                            <p className="font-mono text-xs text-gray-600 mb-4">AI Engineer & Full Stack</p>

                            <div className="flex gap-2 justify-center">
                                {contact.links.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 h-10 flex items-center justify-center bg-white hover:bg-black hover:text-white btn-neo group"
                                        title={link.name}
                                    >
                                        {link.name === "GitHub" && <Github className="w-5 h-5" />}
                                        {link.name === "LinkedIn" && <Linkedin className="w-5 h-5" />}
                                        {link.name === "X (Twitter)" && <Twitter className="w-5 h-5" />}
                                    </a>
                                ))}
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="flex-1 h-10 flex items-center justify-center bg-white hover:bg-black hover:text-white btn-neo"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        <nav className="border-3 border-neo-border bg-white p-0 shadow-neo flex flex-col">
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
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-9 flex flex-col gap-12">
                    {/* Bio Section */}
                    <section className="border-3 border-neo-border bg-white p-8 md:p-12 shadow-neo relative overflow-hidden" id="bio">
                        <div className="absolute -right-10 -top-10 text-[180px] text-gray-100 font-black select-none pointer-events-none z-0">?</div>
                        <div className="relative z-10">
                            <div className="inline-block px-3 py-1 bg-primary border-2 border-black font-mono text-xs mb-6 uppercase tracking-widest font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                Status: Online
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                                Constructing<br />
                                <span className="text-stroke-3 text-transparent bg-clip-text bg-black" style={{ WebkitTextStroke: "2px black" }}>Intelligent Systems</span>
                            </h1>
                            <div className="prose prose-lg max-w-3xl">
                                <p className="font-mono text-lg md:text-xl leading-relaxed mb-6 border-l-4 border-black pl-6 bg-secondary p-4">
                                    I am {name}, a multidisciplinary engineer obsessed with AI agents, scalable architecture, and raw performance.
                                </p>
                                <p className="font-display font-medium text-lg text-gray-800 mb-4 whitespace-pre-wrap">
                                    {summary}
                                </p>
                                <p className="font-display text-gray-600 mb-0">
                                    I don't just write software; I build digital environments that respect the user's intelligence and solve complex problems with elegant, robust code.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Focus Areas */}
                    <section className="flex flex-col gap-6" id="stack">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-8 bg-black flex items-center justify-center text-white">
                                <Layers className="w-5 h-5" />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tight">Focus Areas</h2>
                            <div className="h-1 flex-1 bg-black"></div>
                        </div>
                        <div className="border-3 border-neo-border bg-white shadow-neo">
                            <div className="grid grid-cols-1 md:grid-cols-3 divide-y-3 md:divide-y-0 md:divide-x-3 divide-neo-border">
                                {/* Area 1 */}
                                <div className="p-6 md:p-8 hover:bg-secondary transition-colors">
                                    <h4 className="font-mono font-bold text-black bg-primary inline-block px-2 border-2 border-black mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">01.</h4>
                                    <h3 className="text-xl font-bold uppercase mb-4 mt-2">AI Agents</h3>
                                    <p className="text-sm font-medium text-gray-600 mb-4">Building autonomous systems that think and act.</p>
                                    <ul className="text-sm font-mono list-disc list-inside space-y-1 marker:text-primary">
                                        <li>LangChain / LangGraph</li>
                                        <li>RAG Pipelines</li>
                                        <li>Multi-Agent Systems</li>
                                    </ul>
                                </div>
                                {/* Area 2 */}
                                <div className="p-6 md:p-8 hover:bg-secondary transition-colors">
                                    <h4 className="font-mono font-bold text-black bg-primary inline-block px-2 border-2 border-black mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">02.</h4>
                                    <h3 className="text-xl font-bold uppercase mb-4 mt-2">Full Stack</h3>
                                    <p className="text-sm font-medium text-gray-600 mb-4">End-to-end application development with modern stacks.</p>
                                    <ul className="text-sm font-mono list-disc list-inside space-y-1 marker:text-primary">
                                        <li>Next.js / React</li>
                                        <li>Python / FastAPI</li>
                                        <li>PostgreSQL / Supabase</li>
                                    </ul>
                                </div>
                                {/* Area 3 */}
                                <div className="p-6 md:p-8 hover:bg-secondary transition-colors">
                                    <h4 className="font-mono font-bold text-black bg-primary inline-block px-2 border-2 border-black mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">03.</h4>
                                    <h3 className="text-xl font-bold uppercase mb-4 mt-2">Architecture</h3>
                                    <p className="text-sm font-medium text-gray-600 mb-4">Designing systems that scale and survive.</p>
                                    <ul className="text-sm font-mono list-disc list-inside space-y-1 marker:text-primary">
                                        <li>Microservices</li>
                                        <li>Event-Driven Design</li>
                                        <li>Cloud Native</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Offline Mode - Keeping fun/placeholder elements but adapting slightly */}
                    <section className="flex flex-col gap-6" id="offline">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-8 bg-black flex items-center justify-center text-white">
                                <Gamepad2 className="w-5 h-5" />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tight">Offline Mode</h2>
                            <div className="h-1 flex-1 bg-black"></div>
                        </div>
                        <div className="bg-white border-3 border-neo-border p-8 shadow-neo">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="flex flex-col gap-2 p-4 border-2 border-dashed border-gray-300 bg-secondary/30 hover:bg-secondary hover:border-black transition-all">
                                    <span className="font-mono text-xs font-bold uppercase text-gray-500">Current Focus</span>
                                    <div className="font-bold text-lg leading-tight">AGI Research</div>
                                    <span className="text-xs bg-black text-white px-2 py-1 w-max">Deep Learning</span>
                                </div>
                                <div className="flex flex-col gap-2 p-4 border-2 border-dashed border-gray-300 bg-secondary/30 hover:bg-secondary hover:border-black transition-all">
                                    <span className="font-mono text-xs font-bold uppercase text-gray-500">Code Editor</span>
                                    <div className="font-bold text-lg leading-tight">VS Code</div>
                                    <span className="text-xs bg-primary text-black border border-black px-2 py-1 w-max font-bold">Neo Vim Mode</span>
                                </div>
                                <div className="flex flex-col gap-2 p-4 border-2 border-dashed border-gray-300 bg-secondary/30 hover:bg-secondary hover:border-black transition-all">
                                    <span className="font-mono text-xs font-bold uppercase text-gray-500">Learning</span>
                                    <div className="font-bold text-lg leading-tight">Rust</div>
                                    <span className="text-xs bg-white border border-black text-black px-2 py-1 w-max">Systems</span>
                                </div>
                                <div className="flex flex-col gap-2 p-4 border-2 border-dashed border-gray-300 bg-secondary/30 hover:bg-secondary hover:border-black transition-all">
                                    <span className="font-mono text-xs font-bold uppercase text-gray-500">Location</span>
                                    <div className="font-bold text-lg leading-tight">Bangalore</div>
                                    <span className="text-xs bg-gray-200 border border-gray-400 text-black px-2 py-1 w-max">IST (UTC+5:30)</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="mt-8 bg-secondary border-3 border-neo-border p-10 text-center shadow-neo">
                        <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 tracking-tighter">Ready to build something robust?</h2>
                        <p className="font-mono font-bold mb-8 max-w-xl mx-auto">I am currently open to new opportunities. Let's discuss architecture, agents, or the singularity.</p>
                        <Link
                            href="/contact"
                            className="inline-block bg-primary text-black px-8 py-4 font-bold text-lg uppercase tracking-widest btn-neo hover:bg-black hover:text-white"
                        >
                            Initiate Contact
                        </Link>
                    </section>
                </main>
            </div>
        </div>
    );
}

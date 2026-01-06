'use client';

import Link from 'next/link';
import { ArrowDown, FolderOpen, Mail, Code2, Terminal, GitBranch, Search, Zap } from 'lucide-react';
import { RESUME_DATA } from "@/components/constants";

export default function HomePage() {
  const { name, summary, workExperience, projects, achievements } = RESUME_DATA;
  const featuredProjects = projects.slice(0, 4); // Show top 4 projects

  return (
    <div className="flex-1 w-full">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">

          {/* Main Hero Card */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="border-3 border-neo-border bg-white p-8 md:p-16 shadow-neo relative overflow-hidden h-full flex flex-col justify-center min-h-[500px]">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>

              <div className="flex items-center gap-4 mb-8">
                <div className="inline-block px-3 py-1 bg-black text-primary border-2 border-black font-mono text-xs font-bold uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(39,255,20,1)]">
                  Available for Hire
                </div>
                <div className="h-0.5 flex-1 bg-gray-200"></div>
              </div>

              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8 relative z-10">
                Build<br />
                <span className="text-primary relative inline-block text-shadow-outline">
                  DIFFERENT
                </span><br />
                Scale Hard
              </h1>

              <p className="text-xl md:text-2xl font-bold font-mono max-w-2xl leading-relaxed border-l-8 border-primary pl-6 mb-10 text-gray-800">
                I am a top 1% Software Engineer crafting high-performance, unapologetic digital experiences. No fluff, just raw code.
              </p>

              <div className="flex flex-wrap gap-4 relative z-10">
                <Link
                  href="/projects"
                  className="px-8 py-4 bg-primary text-black font-bold text-lg uppercase tracking-wider btn-neo flex items-center gap-2 group"
                >
                  View Selected Works
                  <ArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 bg-white text-black font-bold text-lg uppercase tracking-wider hover:bg-black hover:text-primary btn-neo transition-all"
                >
                  About Me
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column Grid */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Profile Image Card */}
            <div className="border-3 border-neo-border bg-secondary p-0 shadow-neo flex-1 min-h-[300px] flex flex-col items-center justify-center relative group overflow-hidden">
              {/* Use local profile photo but fallback to placeholder if needed. Since we know /profile-photo.webp exists from previous code, we use it. */}
              <img
                src="/profile-photo.webp"
                alt="Prabhudayal Vaishnav"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 border-3 border-transparent group-hover:border-primary transition-all duration-300 pointer-events-none"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 h-auto">
              <div className="border-3 border-neo-border bg-white p-5 shadow-neo flex flex-col justify-between hover:bg-secondary transition-colors aspect-square">
                <div className="flex justify-between items-start">
                  <Terminal className="w-8 h-8" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h3 className="font-black text-4xl">03+</h3>
                  <p className="font-mono text-[10px] font-bold uppercase leading-tight mt-1">Years of<br />Experience</p>
                </div>
              </div>
              <div className="border-3 border-neo-border bg-black text-primary p-5 shadow-neo flex flex-col justify-between hover:bg-gray-900 transition-colors aspect-square">
                <GitBranch className="w-8 h-8" />
                <div>
                  <h3 className="font-black text-4xl">50+</h3>
                  <p className="font-mono text-[10px] font-bold uppercase leading-tight mt-1 text-white">Projects<br />Deployed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-16 bg-transparent relative overflow-hidden border-y-3 border-neo-border bg-white">
        <div className="max-w-7xl mx-auto px-4 marquee-mask relative z-10 w-full overflow-hidden">
          <div className="flex w-max animate-marquee group">
            {/* Repeat content to ensure seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-20 px-10">
                {/* Tech Stack Icons - Simulating the ones from the HTML but using Lucide/Text for now or simplified */}
                <div className="flex items-center gap-4 md:text-4xl text-2xl font-black uppercase text-gray-300 hover:text-black transition-colors cursor-default">
                  NEXT.JS
                </div>
                <div className="flex items-center gap-4 md:text-4xl text-2xl font-black uppercase text-gray-300 hover:text-black transition-colors cursor-default">
                  REACT
                </div>
                <div className="flex items-center gap-4 md:text-4xl text-2xl font-black uppercase text-gray-300 hover:text-black transition-colors cursor-default">
                  TYPESCRIPT
                </div>
                <div className="flex items-center gap-4 md:text-4xl text-2xl font-black uppercase text-gray-300 hover:text-black transition-colors cursor-default">
                  PYTHON
                </div>
                <div className="flex items-center gap-4 md:text-4xl text-2xl font-black uppercase text-gray-300 hover:text-black transition-colors cursor-default">
                  LANGGRAPH
                </div>
                <div className="flex items-center gap-4 md:text-4xl text-2xl font-black uppercase text-gray-300 hover:text-black transition-colors cursor-default">
                  SUPABASE
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Works & CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 lg:py-20">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Selected Works Box */}
          <div className="neo-brutal-box p-8 md:p-12 bg-white flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Selected<br />Works</h2>
                <FolderOpen className="w-12 h-12 text-primary drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
              </div>
              <p className="font-mono text-gray-600 mb-8 max-w-sm">
                Curated selection of high-impact projects. From enterprise SaaS to experimental web art.
              </p>

              {/* Mini List of Top Projects */}
              <ul className="mb-8 space-y-2 font-mono text-sm">
                {featuredProjects.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black"></span>
                    {p.title}
                  </li>
                ))}
              </ul>

            </div>
            <Link
              href="/projects"
              className="w-full py-4 border-3 border-black bg-primary text-black font-bold uppercase text-center hover:bg-black hover:text-white transition-colors shadow-neo-sm"
            >
              Browse Portfolio
            </Link>
          </div>

          {/* Let's Build / Contact Box */}
          <div className="neo-brutal-box bg-secondary overflow-hidden relative min-h-[400px] flex items-center justify-center">
            <div className="absolute inset-0 pattern-diagonal opacity-5"></div>
            <div className="relative z-10 text-center p-8">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Let's Build</h2>
              <p className="font-mono text-lg mb-8">Have a vision? I have the stack.</p>
              <div className="flex justify-center gap-4">
                <a
                  href={`mailto:${RESUME_DATA.contact.email}`}
                  className="w-16 h-16 flex items-center justify-center border-3 border-black bg-white hover:bg-primary transition-colors shadow-neo-sm text-black"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <a
                  href={RESUME_DATA.contact.links.find(l => l.name === 'LinkedIn')?.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 flex items-center justify-center border-3 border-black bg-white hover:bg-[#0077b5] hover:text-white transition-colors shadow-neo-sm text-black"
                >
                  <Search className="w-6 h-6" /> {/* Placeholder for LinkedIn if not imported, but we used lucide icon before */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

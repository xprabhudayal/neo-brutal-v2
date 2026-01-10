'use client';

import Link from 'next/link';
import { ArrowDown, FolderOpen, Mail, Code2, Terminal, GitBranch, Search, Zap } from 'lucide-react';
import { RESUME_DATA } from "@/components/constants";

export default function HomePage() {
  const { name, summary, workExperience, projects, achievements } = RESUME_DATA;
  const featuredProjects = projects.slice(0, 4); // Show top 4 projects

  return (
    <div className="flex-1 w-full bg-grid">
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
                Engineer<br />
                <span className="text-primary relative inline-block text-shadow-outline">
                  Intelligence
                </span><br />
                Ship Fast
              </h1>

              <p className="text-xl md:text-2xl font-bold font-mono max-w-2xl leading-relaxed border-l-8 border-primary pl-6 mb-6 text-gray-600">
                I am a Research-backed AI Engineer bridging research and production. I build latency-optimized Voice Agents and Computer Vision systems. No fluff, just shipping code.
              </p>

              <p className="text-sm font-mono text-gray-600 mb-10">
                🏆 2x Hackathon Winner & ESIEA Paris Researcher
              </p>

              <div className="flex flex-wrap gap-4 relative z-10">
                <Link
                  href="/projects"
                  className="px-8 py-4 bg-primary text-black font-bold text-lg uppercase tracking-wider btn-neo flex items-center gap-2 group"
                >
                  View Selected Works
                  <ArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                </Link>
                <a
                  href="https://cal.com/ai.pdv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-black font-bold text-lg uppercase tracking-wider hover:bg-black hover:text-primary btn-neo transition-all flex items-center gap-2"
                >
                  Book Strategy Call
                  <span className="text-xl">↗</span>
                </a>
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
                  <p className="font-mono text-[10px] font-bold uppercase leading-tight mt-1 text-white">Projects<br />Built</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section - Hazard Tape Style */}
      <section className="py-0 bg-primary border-y-[3px] border-black relative overflow-hidden">
        {/* Technologies Header */}
        <div className="text-center py-2 border-b-[3px] border-black">
          <h3 className="text-sm font-bold tracking-widest uppercase text-black">The Arsenal</h3>
        </div>
        <div className="w-full overflow-hidden py-6">
          <div className="flex w-max animate-marquee">
            {/* Repeat content to ensure seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-20 px-10">
                <div className="md:text-4xl text-2xl font-black text-black tracking-tight">
                  Next.js
                </div>
                <div className="md:text-4xl text-2xl font-black text-black tracking-tight">
                  ReactJS
                </div>
                <div className="md:text-4xl text-2xl font-black text-black tracking-tight">
                  TypeScript
                </div>
                <div className="md:text-4xl text-2xl font-black text-black tracking-tight">
                  Python
                </div>
                <div className="md:text-4xl text-2xl font-black text-black tracking-tight">
                  LangGraph
                </div>
                <div className="md:text-4xl text-2xl font-black text-black tracking-tight">
                  Supabase
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Validated At Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="border-3 border-neo-border bg-white p-8 md:p-12 shadow-neo">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">Validated At</h2>
            <p className="font-mono text-gray-600 max-w-2xl mx-auto">
              "I don't just write code in a void. My systems have been stress-tested at top research labs and national hackathons."
            </p>
          </div>

          {/* Logo Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* ESIEA Paris */}
            <a
              href="https://www.esiea.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 border-3 border-transparent hover:border-black hover:bg-secondary transition-all"
            >
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <img src="/images/logos/esiea.webp" alt="ESIEA Paris" className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <span className="font-bold text-sm uppercase tracking-tight">ESIEA Paris</span>
              <span className="text-xs font-mono text-gray-500 mt-1">Research Intern</span>
            </a>

            {/* IIM Nagpur */}
            <a
              href="https://www.iimnagpur.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 border-3 border-transparent hover:border-black hover:bg-secondary transition-all"
            >
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <img src="/images/logos/iim-nagpur.webp" alt="IIM Nagpur" className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <span className="font-bold text-sm uppercase tracking-tight">IIM Nagpur</span>
              <span className="text-xs font-mono text-primary bg-black px-2 py-0.5 mt-1">Hackathon Winner</span>
            </a>

            {/* IIIT Delhi */}
            <a
              href="https://iiitd.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 border-3 border-transparent hover:border-black hover:bg-secondary transition-all"
            >
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <img src="/images/logos/iiit-delhi.webp" alt="IIIT Delhi" className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <span className="font-bold text-sm uppercase tracking-tight">IIIT Delhi</span>
              <span className="text-xs font-mono text-primary bg-black px-2 py-0.5 mt-1">HackLLM Winner</span>
            </a>

            {/* Sakana AI */}
            <a
              href="https://sakana.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 border-3 border-transparent hover:border-black hover:bg-secondary transition-all"
            >
              <span className="text-[10px] font-mono text-primary bg-black px-2 py-0.5 mb-2 uppercase">Open Source</span>
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <img src="/images/logos/sakana-ai.webp" alt="Sakana AI" className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <span className="font-bold text-sm uppercase tracking-tight">Sakana AI</span>
              <span className="text-xs font-mono text-gray-500 mt-1">Contributor</span>
            </a>
          </div>
        </div>
      </section>

      {/* Battle Tested - Achievements Carousel */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-8 w-8 bg-black flex items-center justify-center text-primary">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight">Battle Tested</h2>
          <div className="h-1 flex-1 bg-black"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* IIM Nagpur Hackathon */}
          <div className="border-3 border-neo-border bg-white shadow-neo overflow-hidden group">
            <div className="aspect-video overflow-hidden border-b-3 border-black">
              <img
                src="/images/achievements/iim-hackathon.webp"
                alt="IIM Nagpur Hackathon Certificate"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary text-black text-xs font-bold px-2 py-1 border-2 border-black uppercase">Winner</span>
                <span className="bg-black text-primary text-xs font-bold px-2 py-1 uppercase">1ST Place</span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">IIM Nagpur Hackathon</h3>
              <p className="font-mono text-sm text-gray-600">AI Product Comparison Agent</p>
            </div>
          </div>

          {/* IIIT Delhi HackLLM */}
          <div className="border-3 border-neo-border bg-white shadow-neo overflow-hidden group">
            <div className="aspect-video overflow-hidden border-b-3 border-black">
              <img
                src="/images/achievements/hackllm-certificate.webp"
                alt="IIIT Delhi HackLLM Certificate"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary text-black text-xs font-bold px-2 py-1 border-2 border-black uppercase">Winner</span>
                <span className="bg-black text-primary text-xs font-bold px-2 py-1 uppercase">3RD Place</span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">IIIT Delhi HackLLM</h3>
              <p className="font-mono text-sm text-gray-600">Medical AI Summarization System</p>
            </div>
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
                <FolderOpen className="w-12 h-12 text-primary" />
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

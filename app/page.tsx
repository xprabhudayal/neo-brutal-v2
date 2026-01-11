'use client';

import Link from 'next/link';
import { ArrowDown, FolderOpen, Mail, Code2, Terminal, GitBranch, Zap } from 'lucide-react';
import LogoSpotlightCarousel from '@/components/LogoSpotlightCarousel';
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

              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-6 relative z-10">
                Engineer<br />
                <span className="terminal-invert-lg font-black inline-block">
                  Intelligence
                </span><br />
                Ship Fast
              </h1>

              <p className="text-xl max-w-2xl text-gray-500 font-mono leading-relaxed border-l-4 border-primary pl-6 mb-4">
                I am a Research-backed AI Engineer bridging research and production. I build latency-optimized Voice Agents and Computer Vision systems. No fluff, just shipping code.
              </p>

              <p className="text-xs font-mono text-gray-500 mb-8">
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
          <h3 className="text-sm font-bold tracking-widest uppercase inline-block">The Arsenal</h3>
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
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">Validated At</h2>
            <p className="font-mono text-gray-600 max-w-2xl mx-auto">
              "I don't just write code in a void. My systems have been stress-tested at top research labs and national hackathons."
            </p>
          </div>

          {/* Single-Logo Spotlight Carousel */}
          <LogoSpotlightCarousel />
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
                <span className="terminal-invert text-xs font-bold uppercase">1ST Place</span>
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
                <span className="terminal-invert text-xs font-bold uppercase">3RD Place</span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">IIIT Delhi HackLLM</h3>
              <p className="font-mono text-sm text-gray-600">Medical AI Summarization System</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More - Navigation Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 lg:py-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-8 w-8 bg-black flex items-center justify-center text-primary">
            <ArrowDown className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight">Explore More</h2>
          <div className="h-1 flex-1 bg-black"></div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* About Card - Tall Left Column (spans 2 rows) */}
          <Link
            href="/about"
            className="neo-brutal-box p-6 bg-white flex flex-col justify-between min-h-[400px] md:row-span-2 group"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="terminal-invert-sm font-mono">01</span>
                <Code2 className="w-8 h-8 text-gray-400 group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">About</h3>
              <p className="font-mono text-sm text-gray-600 leading-relaxed">
                The story, the stack, the mission.
              </p>
            </div>
            <div className="mt-8 font-mono text-sm font-bold uppercase flex items-center gap-2 text-black">
              Read More <span className="text-lg">→</span>
            </div>
          </Link>

          {/* Selected Works Card - Top Right */}
          <Link
            href="/projects"
            className="neo-brutal-box p-6 bg-primary flex flex-col justify-between min-h-[190px] group"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-black text-primary px-1.5 py-0.5 font-mono text-xs">02</span>
                <FolderOpen className="w-8 h-8 text-black/50 group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Selected<br />Works</h3>
            </div>
            <p className="font-mono text-sm text-black/70">
              {featuredProjects.length}+ curated projects.
            </p>
          </Link>

          {/* Resume Card - Bottom Right */}
          <Link
            href="/resume"
            className="neo-brutal-box p-6 bg-black text-white flex flex-col justify-between min-h-[190px] group"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-primary text-black px-1.5 py-0.5 font-mono text-xs font-bold">03</span>
                <Terminal className="w-8 h-8 text-gray-500 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 text-primary">Resume</h3>
            </div>
            <p className="font-mono text-sm text-gray-400 leading-relaxed">
              Experience, education, skills — all in one place.
            </p>
          </Link>

          {/* Let's Build - Full Width Bottom Bar */}
          <Link
            href="/contact"
            className="neo-brutal-box p-6 bg-white flex items-center justify-between min-h-[80px] md:col-span-3 group"
          >
            <h3 className="text-2xl font-black uppercase tracking-tighter">Let's Build</h3>
            <Mail className="w-8 h-8 text-gray-400 group-hover:text-black transition-colors" />
          </Link>
        </div>
      </section>
    </div>
  );
}

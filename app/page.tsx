import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, FolderOpen, Mail, Code2, Terminal, GitBranch, Zap, Calendar } from 'lucide-react';
import LogoSpotlightCarousel from '@/components/LogoSpotlightCarousel';
import ISTClock from '@/components/ISTClock';
import { RESUME_DATA } from "@/components/constants";

export default function HomePage() {
  const { name, summary, workExperience, projects, achievements } = RESUME_DATA;
  const featuredProjects = projects.slice(0, 4); // Show top 4 projects

  return (
    <div className="flex-1 w-full bg-grid">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">

          {/* Main Hero Card - Contains everything on mobile, left side on desktop */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="border-3 border-neo-border bg-white p-4 sm:p-8 md:p-16 shadow-neo relative overflow-hidden h-full flex flex-col justify-center min-h-[320px] sm:min-h-[500px]">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>

              {/* Mobile: "Available for Hire" Badge & Absolute Profile Image */}
              <div className="relative mb-12 sm:mb-8">
                <div className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-[var(--neo-text)] text-primary border-2 border-[var(--neo-border)] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-neo-sm">
                  Available for Hire
                </div>

                {/* Profile Image - Absolute positioned top-right on mobile, responsive width */}
                <div className="lg:hidden absolute top-0 right-0 w-[28%] max-w-[120px] aspect-[3/4] border-l-3 border-b-3 border-neo-border overflow-hidden bg-secondary">
                  <Image
                    src="/profile-photo.webp"
                    alt="Prabhudayal Vaishnav"
                    fill
                    sizes="(max-width: 768px) 33vw, 20vw"
                    className="object-cover filter grayscale"
                  />
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-4 sm:mb-6 relative z-10">
                Engineer<br />
                <span className="terminal-invert sm:terminal-invert-lg font-black inline-block">
                  Intelligence
                </span><br />
                Ship Fast
              </h1>

              <p className="text-sm sm:text-lg md:text-xl max-w-2xl text-gray-500 font-mono leading-relaxed border-l-4 border-primary pl-3 sm:pl-6 mb-3 sm:mb-4">
                I am a Research-backed AI Engineer bridging research and production. I build latency-optimized Voice Agents and Computer Vision systems. No fluff, just shipping code.
              </p>

              <p className="text-[10px] sm:text-xs font-mono text-gray-500 mb-6 sm:mb-8">
                🏆 2x Hackathon Winner & ESIEA Paris Researcher
              </p>

              <div className="flex flex-col gap-3 relative z-10">
                <Link
                  href="/projects"
                  className="px-5 py-3 sm:px-8 sm:py-4 bg-primary text-black font-bold text-sm sm:text-lg uppercase tracking-wider btn-neo flex items-center justify-center gap-2 group w-full"
                >
                  View Selected Works
                  <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-1 transition-transform" />
                </Link>
                <a
                  href="https://cal.com/ai.pdv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 sm:px-8 sm:py-4 bg-white text-[var(--neo-text)] font-bold text-sm sm:text-lg uppercase tracking-wider hover:bg-[var(--neo-text)] hover:text-primary btn-neo transition-all flex items-center justify-center gap-2 w-full"
                >
                  Book Strategy Call
                  <span className="text-lg sm:text-xl">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column Grid - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-6">
            {/* Profile Image Card - Desktop only */}
            <div className="border-3 border-neo-border bg-secondary p-0 shadow-neo flex-1 min-h-[300px] flex flex-col items-center justify-center relative group overflow-hidden">
              <Image
                src="/profile-photo.webp"
                alt="Prabhudayal Vaishnav"
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 border-3 border-transparent group-hover:border-primary transition-all duration-300 pointer-events-none"></div>
            </div>

            {/* Stats Grid - Desktop only */}
            <div className="grid grid-cols-2 gap-6 h-auto">
              <div className="border-3 border-neo-border bg-white p-5 shadow-neo flex flex-col justify-between hover:bg-secondary transition-colors">
                <div className="flex justify-between items-start">
                  <Terminal className="w-8 h-8" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h3 className="font-black text-4xl">03+</h3>
                  <p className="font-mono text-[10px] font-bold uppercase leading-tight mt-1">Years of<br />Experience</p>
                </div>
              </div>
              <div className="border-3 border-neo-border bg-[var(--neo-text)] text-primary p-5 shadow-neo flex flex-col justify-between hover:opacity-90 transition-colors">
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
      <section className="py-0 bg-primary border-y-[3px] border-[var(--neo-border)] relative overflow-hidden">
        {/* Technologies Header */}
        <div className="text-center py-2 border-b-[3px] border-[var(--neo-border)]">
          <h3 className="text-sm font-bold tracking-widest uppercase inline-block">The Arsenal</h3>
        </div>
        <div className="w-full overflow-hidden py-6">
          <div className="flex w-max animate-marquee">
            {/* Repeat content to ensure seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-20 px-10">
                <div className="md:text-4xl text-2xl font-black text-[var(--neo-text)] tracking-tight">
                  Next.js
                </div>
                <div className="md:text-4xl text-2xl font-black text-[var(--neo-text)] tracking-tight">
                  ReactJS
                </div>
                <div className="md:text-4xl text-2xl font-black text-[var(--neo-text)] tracking-tight">
                  TypeScript
                </div>
                <div className="md:text-4xl text-2xl font-black text-[var(--neo-text)] tracking-tight">
                  Python
                </div>
                <div className="md:text-4xl text-2xl font-black text-[var(--neo-text)] tracking-tight">
                  LangGraph
                </div>
                <div className="md:text-4xl text-2xl font-black text-[var(--neo-text)] tracking-tight">
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
          <div className="h-8 w-8 bg-[var(--neo-text)] flex items-center justify-center text-primary">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight">Battle Tested</h2>
          <div className="h-1 flex-1 bg-[var(--neo-border)]"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* IIM Nagpur Hackathon */}
          <div className="border-3 border-neo-border neo-brutal-box bg-white shadow-neo overflow-hidden group">
            <div className="aspect-video overflow-hidden border-b-3 border-[var(--neo-border)] relative">
              <Image
                src="/images/achievements/iim-hackathon.webp"
                alt="IIM Nagpur Hackathon Certificate"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover img-bw-to-color"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary text-[var(--neo-text)] text-xs font-bold px-2 py-1 border-2 border-[var(--neo-border)] uppercase">Winner</span>
                <span className="terminal-invert text-xs font-bold uppercase">1ST Place</span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">IIM Nagpur Hackathon</h3>
              <p className="font-mono text-sm text-gray-600">AI Product Comparison Agent</p>
            </div>
          </div>

          {/* IIIT Delhi HackLLM */}
          <div className="border-3 border-neo-border neo-brutal-box bg-white shadow-neo overflow-hidden group">
            <div className="aspect-video overflow-hidden border-b-3 border-black relative">
              <Image
                src="/images/achievements/hackllm-certificate.webp"
                alt="IIIT Delhi HackLLM Certificate"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover img-bw-to-color"
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

      {/* Explore More - Premium Navigation Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 lg:py-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-10 w-10 bg-[var(--neo-text)] flex items-center justify-center text-primary shadow-neo-sm">
            <ArrowDown className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight">Explore More</h2>
          <div className="h-1 flex-1 bg-[var(--neo-border)]"></div>
          <span className="font-mono text-xs text-gray-500 hidden md:block">// QUICK NAV</span>
        </div>

        {/* Asymmetric Bento Grid - Enhanced Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 lg:gap-5">

          {/* About Card - Large Left (spans 2 cols, 2 rows) - NOW BLACK */}
          <Link
            href="/about"
            className="sm:col-span-1 md:col-span-2 md:row-span-2 relative group overflow-hidden"
          >
            <div className="border-4 border-[var(--neo-border)] bg-[var(--neo-text)] text-white p-5 sm:p-8 shadow-neo-primary h-full min-h-[180px] sm:min-h-[300px] md:min-h-[420px] flex flex-col justify-between transition-all duration-300 group-hover:translate-x-[3px] group-hover:translate-y-[3px] group-hover:shadow-none relative overflow-hidden">
              {/* Scanline effect */}
              <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(159, 232, 112, 0.03) 2px, rgba(159, 232, 112, 0.03) 4px)' }}></div>

              {/* Animated Corner Decorations */}
              <div className="absolute top-4 left-4 w-5 h-5 border-l-2 border-t-2 border-primary"></div>
              <div className="absolute top-4 right-4 w-5 h-5 border-r-2 border-t-2 border-primary"></div>
              <div className="absolute bottom-4 left-4 w-5 h-5 border-l-2 border-b-2 border-primary"></div>
              <div className="absolute bottom-4 right-4 w-5 h-5 border-r-2 border-b-2 border-primary"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3 sm:mb-6">
                  <span className="bg-primary text-black px-2 py-1 font-mono text-sm font-bold">01</span>
                  <Code2 className="w-10 h-10 text-gray-600 group-hover:text-primary group-hover:rotate-12 transition-all duration-300" />
                </div>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 sm:mb-4 leading-[0.9] text-primary">
                  About<span className="text-white">.</span>
                </h3>
                <p className="font-mono text-xs sm:text-base text-gray-400 leading-relaxed max-w-[200px] hidden sm:block">
                  The story, the stack, the mission behind the code.
                </p>
              </div>

              <div className="relative z-10 hidden sm:flex items-center justify-between pt-6 border-t border-gray-700">
                <span className="font-mono text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-primary transition-colors">Read More</span>
                <span className="w-10 h-10 border-2 border-primary flex items-center justify-center bg-primary text-black group-hover:bg-transparent group-hover:text-primary transition-colors">
                  <span className="text-xl font-bold">→</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Selected Works - Top Middle (Larger - 2.5 cols equivalent) */}
          <Link
            href="/projects"
            className="sm:col-span-1 md:col-span-2 relative group"
          >
            <div className="border-4 border-[var(--neo-border)] bg-primary p-4 sm:p-6 shadow-neo min-h-[180px] sm:min-h-[200px] flex flex-col justify-between transition-all duration-300 group-hover:translate-x-[3px] group-hover:translate-y-[3px] group-hover:shadow-none relative overflow-hidden">
              {/* Diagonal stripes overlay */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)' }}></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-[var(--neo-text)] text-primary px-2 py-1 font-mono text-xs font-bold">02</span>
                  <FolderOpen className="w-10 h-10 text-[var(--neo-text)]/40 group-hover:text-[var(--neo-text)] group-hover:scale-110 transition-all duration-300" />
                </div>
                <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tighter leading-[0.9]">
                  Selected<br />Works
                </h3>
              </div>
              <div className="relative z-10 flex items-center justify-between pt-2 sm:pt-4">
                <span className="font-mono text-sm text-black/70">{featuredProjects.length}+ projects</span>
                <span className="font-black text-xl">↗</span>
              </div>
            </div>
          </Link>

          {/* Book a Call CTA - Top Right (Smaller) */}
          <a
            href="https://cal.com/ai.pdv"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:col-span-1 md:col-span-2 relative group"
          >
            <div className="border-4 border-[var(--neo-border)] bg-secondary p-4 sm:p-5 shadow-neo min-h-[180px] sm:min-h-[200px] flex flex-col justify-between transition-all duration-300 group-hover:translate-x-[3px] group-hover:translate-y-[3px] group-hover:shadow-none relative overflow-hidden">
              {/* Animated pulse effect on hover */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500"></div>
              <div className="absolute inset-0 pattern-diagonal opacity-5"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <span className="terminal-invert-sm font-mono">OPEN</span>
                  <Calendar className="w-8 h-8 text-gray-400 group-hover:text-[var(--neo-text)] group-hover:rotate-6 transition-all duration-300" />
                </div>
                <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tighter leading-[0.95]">
                  Book a<br />Strategy Call
                </h3>
              </div>
              <div className="relative z-10 font-mono text-xs text-gray-600 flex items-center gap-2">
                <span>15 min</span>
                <span className="text-primary font-bold">↗</span>
              </div>
            </div>
          </a>

          {/* Resume Card - Bottom Middle - NOW WHITE */}
          <Link
            href="/resume"
            className="sm:col-span-1 md:col-span-2 relative group"
          >
            <div className="border-4 border-[var(--neo-border)] bg-white p-4 sm:p-6 shadow-neo min-h-[180px] sm:min-h-[200px] flex flex-col justify-between transition-all duration-300 group-hover:translate-x-[3px] group-hover:translate-y-[3px] group-hover:shadow-none relative overflow-hidden">
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 21px), repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 21px)' }}></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="terminal-invert font-mono text-xs">03</span>
                  <Terminal className="w-10 h-10 text-gray-300 group-hover:text-[var(--neo-text)] group-hover:scale-110 transition-all duration-300" />
                </div>
                <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tighter leading-[0.9]">
                  Resume<span className="text-primary">.</span>
                </h3>
              </div>
              <p className="relative z-10 font-mono text-sm text-gray-500">
                Experience • Skills • Education
              </p>
            </div>
          </Link>

          {/* IST Clock Card - Bottom Right (Larger - spanning more) - Visible on mobile now */}
          <div className="col-span-1 md:col-span-2 relative">
            <div className="border-4 border-[var(--neo-border)] bg-[var(--neo-text)] p-4 sm:p-5 shadow-neo-primary min-h-[180px] sm:min-h-[200px] flex flex-col justify-between relative overflow-hidden">
              {/* CRT scanline effect */}
              <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(159, 232, 112, 0.05) 2px, rgba(159, 232, 112, 0.05) 4px)' }}></div>
              {/* Vignette */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)' }}></div>

              {/* Header */}
              <div className="relative z-10">
                <p className="font-mono text-[10px] text-gray-200 uppercase tracking-widest mb-1">IST • GMT+5:30 • 24H</p>
              </div>

              {/* Clock */}
              <div className="relative z-10 flex-1 flex items-center justify-center">
                <ISTClock />
              </div>
            </div>
          </div>

          {/* Let's Build - Full Width Bottom Bar */}
          <Link
            href="/contact"
            className="sm:col-span-2 md:col-span-6 relative group"
          >
            <div className="border-4 border-[var(--neo-border)] bg-white px-4 sm:px-8 py-4 sm:py-6 shadow-neo flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 group-hover:translate-x-[3px] group-hover:translate-y-[3px] group-hover:shadow-none group-hover:bg-primary">
              <div className="flex items-center gap-3 sm:gap-6">
                <span className="text-4xl sm:text-6xl font-black">→</span>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter">Let's Build Together</h3>
                  <p className="font-mono text-sm text-gray-500 group-hover:text-[var(--neo-text)]/70 transition-colors">Have a vision? Let's make it happen.</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <Mail className="w-8 h-8 text-gray-400 group-hover:text-[var(--neo-text)] transition-colors" />
                <div className="w-14 h-14 border-3 border-[var(--neo-border)] flex items-center justify-center bg-[var(--neo-text)] text-primary group-hover:bg-primary group-hover:text-[var(--neo-text)] transition-colors">
                  <span className="text-2xl font-bold">↗</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

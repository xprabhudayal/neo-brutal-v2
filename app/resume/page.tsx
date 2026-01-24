"use client";

import { RESUME_DATA } from "@/components/constants";
import NeoTooltip from "@/components/NeoTooltip";
import {
  Download,
  Briefcase,
  School,
  Trophy,
  Code2,
  ArrowUpRight
} from "lucide-react";

export default function ResumePage() {
  const { contact, workExperience, education, skills, achievements } = RESUME_DATA;



  // Flatten skills for display
  const coreSkills = [...skills.programming, ...skills.ai_ml];
  const otherSkills = [...skills.data, ...skills.misc, ...skills.soft];

  return (
    <div className="flex-1 w-full bg-grid">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-28">
          <div className="flex flex-col gap-6">
            <div className="border-3 border-neo-border bg-white p-6 shadow-neo">
              <div className="w-full aspect-square border-3 border-neo-border mb-4 overflow-hidden relative bg-secondary">
                <img
                  src="/profile-photo.webp"
                  alt={RESUME_DATA.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h1 className="font-bold text-xl uppercase leading-none mb-1">{RESUME_DATA.name}</h1>
              <p className="font-mono text-xs text-gray-600 mb-4">AI Engineer & Full Stack Dev</p>

              <div className="flex gap-2 justify-center flex-wrap">
                {contact.links.map((link) => {
                  const Icon = link.icon || ArrowUpRight;
                  return (
                    <NeoTooltip key={link.name} content={link.name}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center bg-white hover:bg-primary hover:text-black btn-neo transition-all"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    </NeoTooltip>
                  );
                })}
              </div>
            </div>

            <nav className="border-3 border-neo-border bg-white p-0 shadow-neo flex flex-col">
              <div className="bg-[var(--neo-text)] text-white p-3 border-b-3 border-neo-border">
                <h3 className="font-mono text-xs uppercase tracking-widest">Resume.exe</h3>
              </div>
              <a className="px-4 py-3 border-b-2 border-gray-100 hover:bg-primary font-mono text-sm font-bold flex items-center gap-2 transition-colors" href="#skills">
                <Code2 className="w-5 h-5" />
                <span>_SKILLS</span>
              </a>
              <a className="px-4 py-3 border-b-2 border-gray-100 hover:bg-primary font-mono text-sm font-bold flex items-center gap-2 transition-colors" href="#experience">
                <Briefcase className="w-5 h-5" />
                <span>_EXPERIENCE</span>
              </a>
              <a className="px-4 py-3 border-b-2 border-gray-100 hover:bg-primary font-mono text-sm font-bold flex items-center gap-2 transition-colors" href="#education">
                <School className="w-5 h-5" />
                <span>_EDUCATION</span>
              </a>
              <a className="px-4 py-3 hover:bg-primary font-mono text-sm font-bold flex items-center gap-2 transition-colors" href="#awards">
                <Trophy className="w-5 h-5" />
                <span>_AWARDS</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 flex flex-col gap-12">

          {/* Intro Section */}
          <section className="border-3 border-neo-border bg-white p-6 md:p-10 shadow-neo relative overflow-hidden" id="intro">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl select-none pointer-events-none -mt-8 -mr-8">DEV</div>
            <div className="relative z-10 flex flex-col gap-6">
              <div>
                <div className="inline-block px-3 py-1 bg-[var(--neo-text)] text-white font-mono text-xs mb-4 uppercase tracking-widest">Full Stack Engineer</div>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                  {RESUME_DATA.name.split(' ')[0]}<br />{RESUME_DATA.name.split(' ')[1]}
                </h1>
                <p className="text-xl max-w-2xl text-gray-500 leading-relaxed border-l-4 border-primary pl-4">
                  {RESUME_DATA.summary}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-2">
                <a
                  href="/docs/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-primary font-bold uppercase tracking-wider btn-neo transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download PDF Resume
                </a>

              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="flex flex-col gap-6" id="skills">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-[var(--neo-text)] flex items-center justify-center text-white">
                <Code2 className="w-4 h-4" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight">Technical Stack</h2>
              <div className="h-1 flex-1 bg-[var(--neo-border)]"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-3 border-neo-border bg-white shadow-neo group hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div className="bg-secondary border-b-3 border-neo-border p-3">
                  <h3 className="font-mono font-bold uppercase text-sm flex justify-between items-center text-black">
                    <span>// Core Technologies</span>
                    <span className="bg-[var(--neo-text)] text-white px-1 text-xs">[01]</span>
                  </h3>
                </div>
                <div className="p-6 flex flex-wrap gap-2">
                  {coreSkills.map((skill) => (
                    <span key={skill} className="px-3 py-1 border-2 border-[var(--neo-border)] bg-white hover:bg-[var(--neo-text)] hover:text-white font-bold text-sm transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-3 border-neo-border bg-white shadow-neo group hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div className="bg-[var(--neo-text)] text-white border-b-3 border-neo-border p-3">
                  <h3 className="font-mono font-bold uppercase text-sm flex justify-between items-center">
                    <span>// Tools & Others</span>
                    <span className="bg-primary text-[var(--neo-text)] px-1 text-xs">[02]</span>
                  </h3>
                </div>
                <div className="p-6 flex flex-wrap gap-2">
                  {otherSkills.map((skill) => (
                    <span key={skill} className="px-3 py-1 border-2 border-[var(--neo-border)] bg-white hover:bg-primary font-bold text-sm transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="flex flex-col gap-8" id="experience">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-black flex items-center justify-center text-white">
                <Briefcase className="w-4 h-4" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight">Professional Experience</h2>
              <div className="h-1 flex-1 bg-[var(--neo-border)]"></div>
            </div>

            <div className="relative border-l-4 border-[var(--neo-border)] ml-4 md:ml-6 pl-8 md:pl-12 flex flex-col gap-12">
              {workExperience.map((job, index) => (
                <div key={job.company} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[46px] md:-left-[62px] top-6 w-6 h-6 bg-primary border-4 border-[var(--neo-border)] box-content"></div>

                  <div className="neo-brutal-box p-6 md:p-8 bg-white relative hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b-2 border-gray-100 pb-4">
                      <div>
                        <h3 className="text-2xl font-black uppercase leading-tight mb-1">{job.title}</h3>
                        <p className="text-lg font-mono font-bold text-gray-600">{job.company}</p>
                      </div>
                      <div className="self-start md:self-center bg-[var(--neo-text)] text-white px-4 py-2 font-mono text-sm font-bold shadow-neo-primary">
                        {job.date}
                      </div>
                    </div>

                    <ul className="space-y-4 list-none">
                      {job.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="min-w-[6px] h-[6px] mt-[10px] bg-[var(--neo-border)]"></span>
                          <span className="text-base leading-relaxed text-gray-800">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section className="flex flex-col gap-8" id="education">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-black flex items-center justify-center text-white">
                <School className="w-4 h-4" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight">Education</h2>
              <div className="h-1 flex-1 bg-[var(--neo-border)]"></div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {education.map((edu) => (
                <div key={edu.institution} className="neo-brutal-box flex flex-col md:flex-row bg-white relative group overflow-hidden">
                  <div className="md:w-64 bg-secondary border-b-3 md:border-b-0 md:border-r-3 border-neo-border p-6 flex flex-col justify-center items-center text-center group-hover:bg-primary transition-colors">
                    <span className="font-mono font-black text-xl">{edu.date}</span>
                    <span className="mt-2 text-xs font-bold uppercase tracking-widest border-2 border-[var(--neo-border)] px-2 py-0.5 bg-white">Degree</span>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-center relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <School className="w-32 h-32" />
                    </div>
                    <h3 className="text-2xl font-black uppercase leading-tight mb-2 relative z-10">{edu.degree}</h3>
                    <p className="font-mono text-gray-600 text-lg relative z-10">{edu.institution}</p>
                    <p className="mt-4 font-mono text-sm text-gray-500 relative z-10">{edu.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements / Awards Section */}
          <section className="flex flex-col gap-8" id="awards">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-black flex items-center justify-center text-white">
                <Trophy className="w-4 h-4" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight">Recognition</h2>
              <div className="h-1 flex-1 bg-[var(--neo-border)]"></div>
            </div>
            <div className="flex flex-col gap-6">
              {achievements.map((award, index) => (
                <div key={award.title} className="neo-brutal-box p-0 flex flex-col sm:flex-row items-stretch group">
                  <div className={`bg-primary border-b-3 sm:border-b-0 sm:border-r-3 border-neo-border p-6 flex items-center justify-center min-w-[120px] group-hover:bg-[var(--neo-text)] group-hover:text-white transition-colors`}>
                    <span className="font-mono font-black text-xl text-center">{award.date}</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Trophy className="w-24 h-24" />
                    </div>
                    <div className="flex justify-between items-start mb-2 relative z-10">
                      <h3 className="text-2xl font-black uppercase">{award.title}</h3>
                    </div>
                    <p className="font-mono text-sm uppercase tracking-wide text-gray-600 mb-2 relative z-10">{award.organization}</p>
                    <ul className="text-sm border-l-4 border-[var(--neo-border)] pl-3 mt-1 relative z-10 list-none space-y-1">
                      {award.points.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
      </div>
    </div>
    </div>
  );
}

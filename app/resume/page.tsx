"use client";

import { RESUME_DATA } from "@/components/constants";
import {
  Download,
  Briefcase,
  School,
  Trophy,
  Mail,
  Linkedin,
  Github,
  Twitter,
  Code2,
  Instagram,
  User
} from "lucide-react";

export default function ResumePage() {
  const { contact, workExperience, education, skills, achievements } = RESUME_DATA;

  // Helper to find social links
  const getSocialLink = (name: string) => contact.links.find(l => l.name === name)?.url || '#';

  // Flatten skills for display
  const coreSkills = [...skills.programming, ...skills.ai_ml];
  const otherSkills = [...skills.data, ...skills.misc, ...skills.soft];

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-28">
          <div className="flex flex-col gap-6">
            <div className="border-3 border-neo-border bg-white p-6 shadow-neo">
              <div className="w-full aspect-square border-3 border-neo-border mb-4 overflow-hidden relative bg-gray-100 flex items-center justify-center">
                <User className="w-24 h-24 text-gray-400" />
              </div>
              <h1 className="font-bold text-xl uppercase leading-none mb-1">{RESUME_DATA.name}</h1>
              <p className="font-mono text-xs text-gray-600 mb-4">AI Engineer & Full Stack Dev</p>

              <div className="flex gap-2 justify-center">
                <a href={getSocialLink('GitHub')} target="_blank" rel="noopener noreferrer" className="flex-1 h-10 flex items-center justify-center border-2 border-neo-border bg-white hover:bg-black hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href={getSocialLink('LinkedIn')} target="_blank" rel="noopener noreferrer" className="flex-1 h-10 flex items-center justify-center border-2 border-neo-border bg-white hover:bg-black hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={`mailto:${contact.email}`} className="flex-1 h-10 flex items-center justify-center border-2 border-neo-border bg-white hover:bg-black hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 flex flex-col gap-12">

          {/* Intro Section */}
          <section className="border-3 border-neo-border bg-white p-6 md:p-10 shadow-neo relative overflow-hidden" id="intro">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl select-none pointer-events-none -mt-8 -mr-8">DEV</div>
            <div className="relative z-10 flex flex-col gap-6">
              <div>
                <div className="inline-block px-3 py-1 bg-black text-white font-mono text-xs mb-4 uppercase tracking-widest">Full Stack Engineer</div>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                  {RESUME_DATA.name.split(' ')[0]}<br />{RESUME_DATA.name.split(' ')[1]}
                </h1>
                <p className="text-xl md:text-2xl font-medium max-w-2xl leading-relaxed border-l-4 border-primary pl-4">
                  {RESUME_DATA.summary}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-2">
                <button className="flex items-center gap-3 px-6 py-3 bg-primary border-3 border-neo-border font-bold uppercase tracking-wider hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <Download className="w-5 h-5" />
                  Download PDF Resume
                </button>
                <div className="flex items-center gap-2 px-4 py-3 border-3 border-neo-border bg-white font-mono text-sm">
                  <span className="w-3 h-3 bg-primary rounded-full animate-pulse"></span>
                  Bangalore, India
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="flex flex-col gap-6" id="skills">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-black flex items-center justify-center text-white">
                <Code2 className="w-4 h-4" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight">Technical Stack</h2>
              <div className="h-1 flex-1 bg-black"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-3 border-neo-border bg-white shadow-neo group hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div className="bg-support border-b-3 border-neo-border p-3">
                  <h3 className="font-mono font-bold uppercase text-sm flex justify-between items-center text-black">
                    <span>// Core Technologies</span>
                    <span className="bg-black text-white px-1 text-xs">[01]</span>
                  </h3>
                </div>
                <div className="p-6 flex flex-wrap gap-2">
                  {coreSkills.map((skill) => (
                    <span key={skill} className="px-3 py-1 border-2 border-black bg-white hover:bg-black hover:text-white font-bold text-sm transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-3 border-neo-border bg-white shadow-neo group hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div className="bg-black text-white border-b-3 border-neo-border p-3">
                  <h3 className="font-mono font-bold uppercase text-sm flex justify-between items-center">
                    <span>// Tools & Others</span>
                    <span className="bg-primary text-black px-1 text-xs">[02]</span>
                  </h3>
                </div>
                <div className="p-6 flex flex-wrap gap-2">
                  {otherSkills.map((skill) => (
                    <span key={skill} className="px-3 py-1 border-2 border-black bg-white hover:bg-primary font-bold text-sm transition-colors cursor-default">
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
              <div className="h-1 flex-1 bg-black"></div>
            </div>
            <div className="relative timeline-line pl-0 md:pl-0">
              {workExperience.map((job, index) => (
                <div key={job.company} className="relative mb-12 last:mb-0">
                  <div className={`md:flex items-center w-full ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                    <div className={`hidden md:block w-[50%] ${index % 2 !== 0 ? 'pl-12 text-left' : 'pr-12 text-right'}`}>
                      <div className={`inline-block border-2 border-black px-3 py-1 font-mono text-sm font-bold mb-2 transform ${index % 2 !== 0 ? 'rotate-2 bg-white text-black shadow-[4px_4px_0px_0px_#E0EFE0]' : '-rotate-2 bg-black text-white shadow-[4px_4px_0px_0px_#39FF14]'}`}>
                        {job.date}
                      </div>
                      <h3 className="text-2xl font-bold uppercase">{job.title}</h3>
                      <p className="text-lg font-mono font-bold text-gray-600">{job.company}</p>
                    </div>
                    <div className={`absolute left-[22px] md:left-1/2 md:-ml-3 w-6 h-6 border-3 border-black z-10 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${index % 2 !== 0 ? 'bg-white' : 'bg-primary'}`}></div>
                    <div className={`ml-16 md:ml-0 md:w-[50%] ${index % 2 !== 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="md:hidden mb-4">
                        <div className={`inline-block border-2 border-black px-3 py-1 font-mono text-sm font-bold mb-2 ${index % 2 !== 0 ? 'bg-white text-black shadow-[4px_4px_0px_0px_#E0EFE0]' : 'bg-black text-white shadow-[4px_4px_0px_0px_#39FF14]'}`}>
                          {job.date}
                        </div>
                        <h3 className="text-2xl font-bold uppercase">{job.title}</h3>
                        <p className="text-lg font-mono font-bold text-gray-600">{job.company}</p>
                      </div>
                      <div className="neo-brutal-box p-6 relative">
                        <ul className="space-y-3 list-none">
                          {job.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-base leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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
              <div className="h-1 flex-1 bg-black"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <div key={edu.institution} className="neo-brutal-box flex flex-col h-full bg-white relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <School className="w-24 h-24" />
                  </div>
                  <div className="bg-black text-white p-3 border-b-3 border-neo-border flex justify-between items-center z-10 relative">
                    <span className="font-mono font-bold">{edu.date}</span>
                    <span className="bg-primary text-black px-2 py-0.5 text-xs font-bold uppercase tracking-wider">Degree</span>
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow z-10 relative">
                    <div>
                      <h3 className="text-xl font-bold uppercase mb-2 leading-tight">{edu.degree}</h3>
                      <p className="font-mono text-sm text-gray-600 border-l-2 border-primary pl-3 mb-4">{edu.institution}</p>
                      <p className="font-mono text-xs text-gray-500">{edu.details}</p>
                    </div>
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
              <div className="h-1 flex-1 bg-black"></div>
            </div>
            <div className="flex flex-col gap-6">
              {achievements.map((award, index) => (
                <div key={award.title} className="neo-brutal-box p-0 flex flex-col sm:flex-row items-stretch group">
                  <div className={`bg-primary border-b-3 sm:border-b-0 sm:border-r-3 border-neo-border p-6 flex items-center justify-center min-w-[120px] group-hover:bg-black group-hover:text-white transition-colors`}>
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
                    <ul className="text-sm border-l-4 border-black pl-3 mt-1 relative z-10 list-none space-y-1">
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
  );
}

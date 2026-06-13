import os

components = {}

components['Hero.jsx'] = """import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
  };

  return (
    <section className="relative overflow-hidden min-h-[795px] flex items-center px-lg py-xxl" id="home">
      <div className="max-w-container-max mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-xl items-center">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <motion.div variants={item} className="inline-flex items-center gap-sm bg-secondary-container text-on-secondary-container px-md py-xs rounded-full mb-lg shadow-sm border border-on-secondary-container/10">
            <span className="material-symbols-outlined text-[18px]" data-icon="verified">verified</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest">Operational Excellence</span>
          </motion.div>
          <motion.h1 variants={item} className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md leading-tight">
            Operational workflow automation and safe AI solutions for small businesses.
          </motion.h1>
          <motion.p variants={item} className="font-body-lg text-body-lg text-on-surface-variant mb-xl max-w-xl">
            We move your business from spreadsheet chaos to industrial-grade reliability. Professional-grade diagnostics and AI implementation that actually respects your data privacy.
          </motion.p>
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-md">
            <a className="flex items-center justify-center gap-sm bg-primary text-on-primary px-xl py-lg rounded-xl font-headline-sm hover:opacity-90 transition-all shadow-md group" href="#contact">
              Book a free fit call
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
            </a>
            <a className="flex items-center justify-center gap-sm border-2 border-primary text-primary px-xl py-lg rounded-xl font-headline-sm hover:bg-primary hover:text-on-primary transition-all" href="#services">
              View packages
            </a>
          </motion.div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
          className="hidden lg:block"
        >
          <div className="relative p-lg rounded-xxl overflow-hidden bg-white shadow-2xl border border-slate-200">
            <img alt="Operations Dashboard" className="rounded-xl w-full h-[500px] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZE6OKQ5bJ9PCNRZbFYz_Wv9wn5UwhHvktLaV1sU0ihN5G_3ly6hMBVxeRO35AU-eyp0c7FNEBSCbSXNHUF1XcFTFi74M6xPGnkf9qhKDF__rPoWWYGTxalDg69nzb6HFMbWtYsedzAj0U_KLeiim0JKwhdi9u820K8pCe3f861GgGk-EW1Nyq8C7VojOMp0BUj7YFQsf6l0cPfFYlYXrg2LPkdbVh3aqHGnoo-sKY-TvycYmoT0mpwoDn5tBAY3NvWJKrPaus_t85"/>
            <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-md p-lg rounded-xl border border-slate-200 shadow-xl">
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined" data-icon="trending_up">trending_up</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-primary">+40% Efficiency Gains</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Avg. across diagnostic-led sprints</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
"""

components['Problem.jsx'] = """import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Problem() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  const step1Opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.35, 0.45], [0, 1, 1, 0]);
  const step1Y = useTransform(scrollYProgress, [0.1, 0.2, 0.35, 0.45], [50, 0, 0, -50]);
  const step1Scale = useTransform(scrollYProgress, [0.1, 0.2], [0.9, 1]);

  const step2Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.65, 0.75], [0, 1, 1, 0]);
  const step2Y = useTransform(scrollYProgress, [0.4, 0.5, 0.65, 0.75], [50, 0, 0, -50]);
  const step2Scale = useTransform(scrollYProgress, [0.4, 0.5], [0.9, 1]);

  const step3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.95, 1], [0, 1, 1, 1]);
  const step3Y = useTransform(scrollYProgress, [0.7, 0.8, 0.95, 1], [50, 0, 0, 0]);
  const step3Scale = useTransform(scrollYProgress, [0.7, 0.8], [0.9, 1]);

  return (
    <section ref={containerRef} className="bg-primary text-on-primary h-[300vh]" id="problem">
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-lg overflow-hidden">
        
        <motion.div style={{ opacity: titleOpacity, y: titleY }} className="absolute top-[20%] text-center px-lg w-full max-w-4xl">
          <h2 className="font-headline-md text-headline-md mb-md">When work depends on memory, the business is at risk.</h2>
        </motion.div>

        <div className="relative w-full max-w-4xl h-[400px]">
          <motion.div style={{ opacity: step1Opacity, y: step1Y, scale: step1Scale }} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col md:flex-row gap-lg items-start">
            <span className="font-display-lg text-secondary-fixed-dim shrink-0">01</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm mb-sm text-white">Duplicated Entry Fatigue</h3>
              <p className="font-body-lg text-body-lg text-on-primary-fixed-variant">Entering the same client data into three different tools isn't just slow; it's where errors live.</p>
            </div>
          </motion.div>

          <motion.div style={{ opacity: step2Opacity, y: step2Y, scale: step2Scale }} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col md:flex-row gap-lg items-start">
            <span className="font-display-lg text-secondary-fixed-dim shrink-0">02</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm mb-sm text-white">The Spreadsheet Ceiling</h3>
              <p className="font-body-lg text-body-lg text-on-primary-fixed-variant">Spreadsheets break down when more than two people need to use them simultaneously for operations.</p>
            </div>
          </motion.div>

          <motion.div style={{ opacity: step3Opacity, y: step3Y, scale: step3Scale }} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col md:flex-row gap-lg items-start">
            <span className="font-display-lg text-secondary-fixed-dim shrink-0">03</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm mb-sm text-white">The AI Wild West</h3>
              <p className="font-body-lg text-body-lg text-on-primary-fixed-variant">Staff are already using AI. Without clear rules and safe pipelines, your intellectual property is leaking.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
"""

components['Services.jsx'] = """import React from 'react';
import { motion } from 'framer-motion';

export default function Services() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const card = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 60, damping: 15 } }
  };

  const servicesData = [
    { icon: 'troubleshoot', title: 'Workflow Diagnostic', desc: 'A deep audit of your current ops to identify bottleneck "spreadsheet ceilings."', price: 'Launching at $990', link: 'Get Started', bg: 'bg-surface-container', text: 'text-primary' },
    { icon: 'auto_mode', title: 'Workflow Automation Sprint', desc: 'End-to-end automation of your most critical repetitive process. 2-week cycle.', price: 'From $4,500', link: 'View Sprint', bg: 'bg-surface-container', text: 'text-primary' },
    { icon: 'dashboard', title: 'Operations Dashboard', desc: 'Real-time visibility into your business health. Stop guessing, start seeing.', price: 'From $4,500', link: 'See Demo', bg: 'bg-surface-container', text: 'text-primary' },
    { icon: 'security', title: 'AI Readiness & Safe Use', desc: 'Governance, policy, and a custom secure AI pipeline for your staff.', price: 'From $4,800', link: 'Secure Ops', bg: 'bg-secondary-container', text: 'text-on-secondary-container', active: true },
    { icon: 'medical_services', title: 'NDIS Operations Pack', desc: 'Strictly operational workflow for service delivery and claim tracking.', price: 'From $6,500', link: 'Streamline Claims', bg: 'bg-surface-container', text: 'text-primary' },
    { icon: 'rocket_launch', title: 'Custom App Build', desc: "When off-the-shelf tools won't cut it. Bespoke internal tools that scale.", price: 'From $9,500', link: 'Build Future', bg: 'bg-primary', text: 'text-on-primary' }
  ];

  return (
    <section className="py-xxl px-lg bg-surface" id="services">
      <div className="max-w-container-max mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-xxl text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">Practical Offers for Precise Growth</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Industrial-grade solutions that focus on operational integrity, not just "cool tech."</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg"
        >
          {servicesData.map((s, i) => (
            <motion.div key={i} variants={card} className="glass-card p-xl rounded-xl border border-slate-200 hover:shadow-xl transition-all group flex flex-col h-full">
              <div className={`w-14 h-14 ${s.bg} rounded-full flex items-center justify-center ${s.text} mb-lg group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-[32px]" data-icon={s.icon}>{s.icon}</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm mb-sm text-primary">{s.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-xl">{s.desc}</p>
              <div className="mt-auto">
                <p className="font-label-md text-label-md text-secondary mb-md">{s.price}</p>
                <a className="flex items-center gap-sm text-primary font-bold hover:underline" href="#contact">{s.link} <span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span></a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
"""

components['Checklist.jsx'] = """import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Checklist() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section className="py-xxl px-lg" id="checklist" ref={containerRef}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-container-max mx-auto bg-primary text-on-primary rounded-xxl p-xl md:p-xxl relative overflow-hidden flex flex-col md:flex-row items-center gap-xl"
      >
        <div className="relative z-10 flex-1">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-md">Is your business ready for automation?</h2>
          <p className="font-body-lg text-body-lg text-on-primary-fixed-variant mb-xl">Download our "Workflow Automation Opportunity Checklist" to identify the low-hanging fruit in your operations.</p>
          <button className="bg-secondary-fixed text-on-secondary-fixed px-xl py-lg rounded-xl font-headline-sm hover:scale-105 transition-transform flex items-center gap-md">
            <span className="material-symbols-outlined" data-icon="download">download</span>
            Download the Checklist
          </button>
        </div>
        <div className="relative z-10 flex-1 hidden lg:block">
          <motion.div style={{ y: parallaxY }} className="bg-white/10 backdrop-blur-md p-lg rounded-xl border border-white/20 rotate-3 transform shadow-2xl">
            <img alt="Checklist Preview" className="rounded-lg w-full h-auto shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPEz3ronE3xNYG45Wfa7YhUbGtQXxRpenB-kBWi1Ee1A7kxMAlEKNFZXX1ECOWMM1gA4irAYTFSzFu3V0_AuViKXAF9vIOrkuMW1KZWHX8_uZGpIPtyp7mPtZFei-X58JeR8o3xayU8CmXKLCvp6ew9UPOVMblg1zwIbH1rHeE3xL-eaEWtgwMcaxr-q3i0l8oMqic0PYPeTBjA2mzCK8ACBDaB2Ic4zN-HWSX1QLT-PTEETSWDcijo7ya9hAqj05jAojImtxsCCzo"/>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
"""

for name, content in components.items():
    with open(f'src/components/{name}', 'w') as f:
        f.write(content)

import React from 'react';
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

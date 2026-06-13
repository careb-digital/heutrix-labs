import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section className="py-xxl px-lg bg-surface" id="contact">
      <div className="max-w-container-max mx-auto">
        <div className="grid lg:grid-cols-2 gap-xxl">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.3 }}>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">Let's talk operational fit.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">We don't work with everyone. We only take on projects where we can see a clear 3x+ ROI on operational efficiency.</p>
            <div className="space-y-lg">
              <div className="flex items-center gap-lg">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" data-icon="mail">mail</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-primary">Email Us</p>
                  <p className="font-body-md text-body-md text-on-surface-variant">hello@heutrixlabs.com</p>
                </div>
              </div>
              <div className="flex items-center gap-lg">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" data-icon="schedule">schedule</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-primary">Fast Response</p>
                  <p className="font-body-md text-body-md text-on-surface-variant">Within 24 business hours</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }}>
            <form className="glass-card p-xl rounded-xxl border border-slate-200 shadow-xl space-y-md" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-primary px-xs">Full Name</label>
                  <input className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" placeholder="John Doe" type="text"/>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-primary px-xs">Business Name</label>
                  <input className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" placeholder="Acme Corp" type="text"/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-primary px-xs">Email Address</label>
                  <input className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" placeholder="john@acme.com" type="email"/>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-primary px-xs">Website URL</label>
                  <input className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" placeholder="https://" type="url"/>
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-primary px-xs">Operational Status</label>
                <div className="space-y-sm mt-xs">
                  <label className="flex items-center gap-md p-md border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input className="w-5 h-5 text-secondary rounded" type="checkbox"/>
                    <span className="font-body-md">We depend heavily on spreadsheets</span>
                  </label>
                  <label className="flex items-center gap-md p-md border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input className="w-5 h-5 text-secondary rounded" type="checkbox"/>
                    <span className="font-body-md">Staff are already using AI informally</span>
                  </label>
                </div>
              </div>
              <button className="w-full bg-primary text-on-primary py-lg rounded-xl font-headline-sm hover:opacity-95 transition-all shadow-md mt-md">
                Request Fit Call
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

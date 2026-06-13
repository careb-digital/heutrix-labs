import os

components = {}

components['About.jsx'] = """import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-xxl px-lg bg-surface-container-low overflow-hidden" id="about">
      <div className="max-w-container-max mx-auto">
        <div className="grid lg:grid-cols-2 gap-xxl items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.3 }}>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">"We diagnose before we build."</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg">
              At Heutrix Labs, we believe that technology applied to an inefficient process only magnifies the inefficiency. That's why we start with the numbers, the people, and the manual clicks.
            </p>
            <div className="p-lg bg-error-container text-on-error-container rounded-xl border-l-4 border-error mb-xl">
              <div className="flex items-start gap-md">
                <span className="material-symbols-outlined mt-1" data-icon="warning">warning</span>
                <div>
                  <p className="font-label-md text-label-md font-bold mb-xs">Legal Disclaimer</p>
                  <p className="font-body-sm text-body-sm">
                    Heutrix Labs provides operational workflow solutions. We do **NOT** provide NDIS audit readiness, compliance assurance, or legislative advice. Our work is strictly focused on business efficiency and technical operations.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-lg">
              <div className="flex -space-x-3">
                <img alt="Team 1" className="w-12 h-12 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_FDpeGrj83O_E8dSV8puy049SMrnZP1KWY9CICQXfQpUmnaoJ1HKMvvk7nSMZQeTk2YWrZTmzqaZpb0XPur2m7CTWjJwqOE_6xunZFl0Zh3TJwB-Lnb4rfBoh0UYbl7t3KFi0cKoWJ7MX8Kr_UBTRocorXCLTcf5GpWMlCO1-h0zbUfOXsh0JiUGt1Knp3YXEOgQSiJg-wIc5-H6EGjPOMxrek2r3LQcHyFjXOpPAIv42riwpAYGjN5H0sm3BhZ0v9NkSFlqUw7Q4"/>
                <img alt="Team 2" className="w-12 h-12 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhGknVEQFeApSJYPmla1zIIqpSm2EE4GXcMy4urTBFk8J5vwy4fxcFYfoxwDGVjfd2iaQ91KChi6zOBAsQ23gPDFN81G3xrb84SHl_vzxNwhPgGQR2e-1SzuLJbiVBj6Hf1dJGM_qls2-6XBAm-75CQxqUCmZvSZdfXHLgPJyCHEZDsPr51hWKj4q9pxIOAqWal0xqSl8NF5dMK7xxTvY7-qR6kfHofYULF1k3x6jOnLzujuT6erJVyRA7HgBcxb0glIOQWWH78XUn"/>
                <img alt="Team 3" className="w-12 h-12 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVbGk5V7d77WyI_yuJOm4CgSXeWX--jLXEPC9S9uxjX_CjzRk630OaMaoez2NtqR9wUWwllN38vlX24v0jxO0OTPuZOUMww3rEDEJgGvCU-bzTwhWWu-kHTGeYbd-rFHKRIbMjHvbkEgQFe_DCmvjmE7Jxf5XbFug5sSHGIo2LkYwbpNyToQRriSx2YFl3e8y-xxKp5Humq6Z2RPfimZ5KDr0QH1J6XN7TZzMWvaAhJ4BR-EtPSi1A9nzBZwWR92PFUho6BBLqaSVq"/>
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant">Trusted by 50+ Small Businesses</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }}>
            <div className="relative">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="relative glass-card p-xl rounded-xxl border border-slate-200 shadow-xl overflow-hidden">
                <h4 className="font-headline-sm text-headline-sm mb-lg text-primary">The Heutrix Method</h4>
                <ul className="space-y-md">
                  <li className="flex items-center gap-md">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">1</div>
                    <p className="font-body-md text-body-md">Diagnostic: Finding the gaps</p>
                  </li>
                  <li className="flex items-center gap-md">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">2</div>
                    <p className="font-body-md text-body-md">Infrastructure: Cleaning the data</p>
                  </li>
                  <li className="flex items-center gap-md">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">3</div>
                    <p className="font-body-md text-body-md">Automation: Deleting the busywork</p>
                  </li>
                  <li className="flex items-center gap-md">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">4</div>
                    <p className="font-body-md text-body-md">Safe AI: Scaling human potential</p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
"""

components['FAQ.jsx'] = """import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: 'How long does a typical automation sprint take?', a: 'Our standard Workflow Automation Sprints are designed for a 2-week turnaround. This includes discovery, build, and a 3-day testing period. Larger custom builds are quoted based on complexity.' },
    { q: 'Is our data safe with your AI solutions?', a: 'Yes. We do not use public ChatGPT for business operations. We implement private API pipelines where your data is NOT used for training the base models, ensuring full data sovereignty.' },
    { q: 'Do you help with NDIS audits?', a: 'No. Our NDIS Operational Pack is strictly for automating service delivery, scheduling, and invoicing workflows. For compliance and audit readiness, we recommend speaking with Heutrix Assurance (a separate entity).' }
  ];

  return (
    <section className="py-xxl px-lg bg-surface" id="faq">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-xxl">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">Operational Clarity</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Common questions about working with Heutrix Labs.</p>
        </motion.div>
        
        <div className="space-y-md">
          {faqs.map((faq, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4, delay: index * 0.1 }} 
              viewport={{ once: true }}
              key={index} 
              className={`border border-slate-200 rounded-xl overflow-hidden bg-white transition-all ${openIndex === index ? 'shadow-md border-secondary/30' : 'shadow-sm'}`}
            >
              <button 
                className="w-full flex items-center justify-between p-lg text-left hover:bg-slate-50 transition-colors" 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-headline-sm text-headline-sm text-primary">{faq.q}</span>
                <motion.span 
                  animate={{ rotate: openIndex === index ? 180 : 0 }} 
                  className="material-symbols-outlined" 
                  data-icon="expand_more"
                >
                  expand_more
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    transition={{ duration: 0.3 }}
                    className="px-lg pb-lg text-on-surface-variant font-body-md overflow-hidden"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"""

components['Contact.jsx'] = """import React from 'react';
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
"""

components['Footer.jsx'] = """import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary pt-xxl pb-xl px-lg border-t border-on-primary-fixed-variant">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-lg mb-xxl">
          <div className="max-w-md">
            <span className="font-headline-sm text-headline-sm text-secondary-fixed font-bold block mb-md">Heutrix Labs</span>
            <p className="font-body-sm text-body-sm text-on-primary-fixed-variant mb-md">
              Operational excellence for the modern small business. We bridge the gap between chaotic spreadsheets and industrial-grade automation.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-xl">
            <div>
              <p className="font-label-md text-label-md text-white mb-md">Company</p>
              <ul className="space-y-sm font-body-sm text-on-primary-fixed-variant">
                <li><a className="hover:text-white transition-colors" href="#about">About</a></li>
                <li><a className="hover:text-white transition-colors" href="#services">Services</a></li>
                <li><a className="hover:text-white transition-colors" href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="font-label-md text-label-md text-white mb-md">Legal</p>
              <ul className="space-y-sm font-body-sm text-on-primary-fixed-variant">
                <li><a className="hover:text-white transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Terms of Service</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Legal Disclaimer</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="font-label-md text-label-md text-white mb-md">Social</p>
              <div className="flex gap-md">
                <a className="w-10 h-10 rounded-full bg-on-primary-fixed-variant/20 flex items-center justify-center hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all" href="#">
                  <span className="material-symbols-outlined text-[20px]" data-icon="share">share</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-on-primary-fixed-variant pt-lg flex flex-col gap-lg">
          <div className="p-lg bg-on-primary-fixed-variant/10 rounded-xl">
            <p className="font-label-sm text-label-sm font-bold text-secondary-fixed mb-xs uppercase tracking-widest">Brand Separation Statement</p>
            <p className="font-body-sm text-body-sm text-on-primary-fixed-variant">
              Heutrix Labs and Heutrix Assurance are distinct business units. Heutrix Labs focuses solely on operational workflow and technical automation. We do not provide assurance, auditing, or compliance verification services. No partnership or engagement with Heutrix Labs constitutes an audit-ready status.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-md">
            <p className="font-body-sm text-body-sm text-on-primary-fixed-variant">© 2024 Heutrix Labs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
"""

components['Navbar.jsx'] = """import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const sectionCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    const sectionObserver = new IntersectionObserver(sectionCallback, {
      threshold: 0,
      rootMargin: '-40% 0px -40% 0px'
    });
    document.querySelectorAll('section[id], main > section[id]').forEach(el => {
      sectionObserver.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sectionObserver.disconnect();
    }
  }, []);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    setDrawerOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant shadow-sm transition-all duration-300 ${scrolled ? 'py-1 shadow-md' : 'py-md'}`} id="main-header">
        <div className="flex justify-between items-center px-lg max-w-container-max mx-auto h-16">
          <div className="flex items-center gap-md">
            <button className="md:hidden p-sm text-primary" onClick={() => setDrawerOpen(true)}>
              <span className="material-symbols-outlined" data-icon="menu">menu</span>
            </button>
            <a className="font-headline-md text-headline-md font-bold text-primary tracking-tight" href="#">Heutrix Labs</a>
          </div>
          <nav className="hidden md:flex items-center gap-lg">
            {['home', 'services', 'about', 'faq'].map((id) => (
              <a
                key={id}
                className={`font-label-md text-label-md transition-colors ${
                  activeSection === id || (activeSection === 'problem' && id === 'home') || (activeSection === 'checklist' && id === 'faq')
                    ? 'text-secondary border-b-2 border-secondary pb-1'
                    : 'text-on-surface-variant hover:text-secondary'
                }`}
                href={`#${id}`}
                onClick={(e) => scrollToSection(e, id)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <a className="bg-primary text-on-primary px-lg py-sm rounded-xl font-label-md text-label-md hover:opacity-90 transition-all shadow-sm" href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Book a Free Fit Call</a>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-primary/20 backdrop-blur-sm z-[55] transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setDrawerOpen(false)}></div>
      <aside className={`fixed inset-y-0 left-0 z-[60] w-64 bg-surface-container-lowest transform transition-transform duration-300 ease-in-out p-md flex flex-col gap-md ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-lg">
          <span className="font-headline-sm text-headline-sm font-bold text-primary">Heutrix Labs</span>
          <button className="p-sm" onClick={() => setDrawerOpen(false)}>
            <span className="material-symbols-outlined" data-icon="close">close</span>
          </button>
        </div>
        <nav className="flex flex-col gap-xs">
          {[
            { id: 'home', icon: 'home', label: 'Home' },
            { id: 'services', icon: 'settings', label: 'Services' },
            { id: 'about', icon: 'info', label: 'About' },
            { id: 'faq', icon: 'help', label: 'FAQ' },
          ].map((item) => (
            <a
              key={item.id}
              className={`flex items-center gap-md p-md rounded-xl transition-colors ${
                activeSection === item.id || (activeSection === 'problem' && item.id === 'home') || (activeSection === 'checklist' && item.id === 'faq')
                  ? 'bg-secondary-container text-on-secondary-container font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
            >
              <span className="material-symbols-outlined" data-icon={item.icon}>{item.icon}</span> {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto pt-lg border-t border-outline-variant">
          <a className="block text-center bg-secondary-fixed-dim text-on-secondary-fixed p-md rounded-xl font-label-md" href="#checklist" onClick={(e) => scrollToSection(e, 'checklist')}>Download Checklist</a>
        </div>
      </aside>
    </>
  );
}
"""

for name, content in components.items():
    with open(f'src/components/{name}', 'w') as f:
        f.write(content)

app_content = """import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Services from './components/Services';
import About from './components/About';
import FAQ from './components/FAQ';
import Checklist from './components/Checklist';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-background text-on-background font-body-md selection:bg-secondary-container selection:text-on-secondary-container">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Problem />
        <Services />
        <About />
        <FAQ />
        <Checklist />
        <Contact />
      </main>
      <Footer />
      
      {/* FAB */}
      <a className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group md:hidden" href="#contact">
        <span className="material-symbols-outlined" data-icon="call">call</span>
      </a>
    </div>
  );
}
"""

with open('src/App.jsx', 'w') as f:
    f.write(app_content)

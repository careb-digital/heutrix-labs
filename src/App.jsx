import React from 'react';
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

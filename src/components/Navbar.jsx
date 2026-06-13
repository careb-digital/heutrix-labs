import React, { useState, useEffect } from 'react';

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

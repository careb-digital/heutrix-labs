import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# Replace import
content = content.replace("import React, { useEffect } from 'react';", "import React, { useEffect, useState } from 'react';")

# Replace function signature and add state
content = content.replace("export default function App() {\n  useEffect(() => {", "export default function App() {\n  const [activeSection, setActiveSection] = useState('home');\n\n  useEffect(() => {")

# Replace Intersection Observers
old_observer = """    // Intersection Observer
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observer = new IntersectionObserver(revealCallback, {
      threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    }"""

new_observer = """    // Intersection Observer for Reveal Animations
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => {
      revealObserver.observe(el);
    });

    // Intersection Observer for Active Section
    const sectionCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const sectionObserver = new IntersectionObserver(sectionCallback, {
      threshold: 0.5,
      rootMargin: '-10% 0px -50% 0px'
    });

    document.querySelectorAll('section[id], main > section[id]').forEach(el => {
      sectionObserver.observe(el);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
      sectionObserver.disconnect();
    }"""

content = content.replace(old_observer, new_observer)

# Add scrollToSection
scroll_to_section = """  const toggleDrawer = () => {"""
new_scroll_to_section = """  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      // Temporarily remove active to retrigger animation
      const reveals = Array.from(target.querySelectorAll('.reveal'));
      if (target.classList.contains('reveal')) reveals.push(target);
      reveals.forEach(el => el.classList.remove('active'));
      
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDrawer = () => {"""

content = content.replace(scroll_to_section, new_scroll_to_section)

# Update Desktop Nav
old_desktop_nav = """<nav className="hidden md:flex items-center gap-lg">
<a className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1" href="#home">Home</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors" href="#services">Services</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors" href="#about">About</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors" href="#faq">FAQ</a>
<a className="bg-primary text-on-primary px-lg py-sm rounded-xl font-label-md text-label-md hover:opacity-90 transition-all shadow-sm" href="#contact">Book a Free Fit Call</a>
</nav>"""

new_desktop_nav = """<nav className="hidden md:flex items-center gap-lg">
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
</nav>"""

content = content.replace(old_desktop_nav, new_desktop_nav)

# Update Mobile Nav
old_mobile_nav = """<nav className="flex flex-col gap-xs">
<a className="flex items-center gap-md p-md bg-secondary-container text-on-secondary-container font-bold rounded-full" href="#home" onClick={toggleDrawer}>
<span className="material-symbols-outlined" data-icon="home">home</span> Home
            </a>
<a className="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-container-low rounded-xl" href="#services" onClick={toggleDrawer}>
<span className="material-symbols-outlined" data-icon="settings">settings</span> Services
            </a>
<a className="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-container-low rounded-xl" href="#pricing" onClick={toggleDrawer}>
<span className="material-symbols-outlined" data-icon="payments">payments</span> Pricing
            </a>
<a className="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-container-low rounded-xl" href="#about" onClick={toggleDrawer}>
<span className="material-symbols-outlined" data-icon="info">info</span> About
            </a>
<a className="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-container-low rounded-xl" href="#faq" onClick={toggleDrawer}>
<span className="material-symbols-outlined" data-icon="help">help</span> FAQ
            </a>
</nav>"""

new_mobile_nav = """<nav className="flex flex-col gap-xs">
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
      onClick={(e) => {
        scrollToSection(e, item.id);
        toggleDrawer();
      }}
    >
      <span className="material-symbols-outlined" data-icon={item.icon}>{item.icon}</span> {item.label}
    </a>
  ))}
</nav>"""

content = content.replace(old_mobile_nav, new_mobile_nav)

# Add html-smooth to index.html
with open('index.html', 'r') as f_idx:
    idx_content = f_idx.read()

idx_content = idx_content.replace('<html lang="en">', '<html lang="en" className="scroll-smooth">')
# wait className won't work in index.html, it's just html
idx_content = idx_content.replace('className=', 'class=') # revert if it changed
idx_content = idx_content.replace('<html lang="en">', '<html lang="en" class="scroll-smooth">')

with open('index.html', 'w') as f_idx:
    f_idx.write(idx_content)

with open('src/App.jsx', 'w') as f:
    f.write(content)


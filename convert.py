import re

with open('stitch_code.html', 'r') as f:
    html = f.read()

# Extract from <!-- TopAppBar --> to </footer>
start = html.find('<!-- TopAppBar -->')
end = html.find('<!-- FAB -->') + len('<!-- FAB -->')

if start != -1 and end != -1:
    body_content = html[start:html.find('</footer>', start) + len('</footer>')]
    
    # Also add the FAB
    fab_start = html.find('<!-- FAB -->')
    fab_end = html.find('</a>', fab_start) + len('</a>')
    if fab_start != -1:
        body_content += '\n' + html[fab_start:fab_end]

    # Convert to JSX
    jsx = body_content.replace('class=', 'className=')
    jsx = jsx.replace('onclick=', 'onClick=')
    jsx = jsx.replace('onsubmit=', 'onSubmit=')
    jsx = jsx.replace('for=', 'htmlFor=')
    jsx = jsx.replace('<!--', '{/*').replace('-->', '*/}')
    
    # Close self closing tags like input, img, hr, br, etc.
    jsx = re.sub(r'<img([^>]*[^/])>', r'<img\1/>', jsx)
    jsx = re.sub(r'<input([^>]*[^/])>', r'<input\1/>', jsx)
    jsx = re.sub(r'<hr([^>]*[^/])>', r'<hr\1/>', jsx)
    jsx = re.sub(r'<br([^>]*[^/])>', r'<br\1/>', jsx)
    
    # Fix the missing closures just in case. The script isn't perfect but handles standard self closing.
    
    app_jsx = f"""import React, {{ useEffect }} from 'react';

export default function App() {{
  useEffect(() => {{
    // Scrollytelling Highlight
    const handleScroll = () => {{
      const scrollyTexts = document.querySelectorAll('.scrolly-text');
      scrollyTexts.forEach(text => {{
        const rect = text.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3) {{
          text.classList.add('highlight');
        }} else {{
          text.classList.remove('highlight');
        }}
      }});

      // Header Blur/Shrink
      const header = document.getElementById('main-header');
      if (header) {{
        if (window.scrollY > 50) {{
          header.classList.add('py-1', 'shadow-md');
          header.classList.remove('py-md');
        }} else {{
          header.classList.remove('py-1', 'shadow-md');
          header.classList.add('py-md');
        }}
      }}
    }};

    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer
    const revealCallback = (entries, observer) => {{
      entries.forEach(entry => {{
        if (entry.isIntersecting) {{
          entry.target.classList.add('active');
        }}
      }});
    }};

    const observer = new IntersectionObserver(revealCallback, {{
      threshold: 0.1
    }});

    document.querySelectorAll('.reveal').forEach(el => {{
      observer.observe(el);
    }});
    
    return () => {{
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    }}
  }}, []);

  const toggleDrawer = () => {{
    const drawer = document.getElementById('nav-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if(!drawer || !overlay) return;
    const isOpen = !drawer.classList.contains('-translate-x-full');

    if (isOpen) {{
      drawer.classList.add('-translate-x-full');
      overlay.classList.add('hidden');
      overlay.classList.remove('opacity-100');
    }} else {{
      drawer.classList.remove('-translate-x-full');
      overlay.classList.remove('hidden');
      setTimeout(() => overlay.classList.add('opacity-100'), 10);
    }}
  }};

  const toggleFaq = (e) => {{
    const button = e.currentTarget;
    const content = button.nextElementSibling;
    const icon = button.querySelector('.material-symbols-outlined');
    const isOpen = !content.classList.contains('hidden');

    // Close all
    document.querySelectorAll('.faq-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('#faq .material-symbols-outlined').forEach(el => el.style.transform = 'rotate(0deg)');

    if (!isOpen) {{
      content.classList.remove('hidden');
      icon.style.transform = 'rotate(180deg)';
      button.parentElement.classList.add('border-secondary/30', 'shadow-md');
    }} else {{
      button.parentElement.classList.remove('border-secondary/30', 'shadow-md');
    }}
  }};

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-secondary-container selection:text-on-secondary-container">
      {jsx}
    </div>
  );
}}
"""
    # Replace onClick string references with function references
    app_jsx = app_jsx.replace('onClick="toggleDrawer()"', 'onClick={toggleDrawer}')
    app_jsx = app_jsx.replace('onClick="toggleFaq(this)"', 'onClick={toggleFaq}')
    app_jsx = app_jsx.replace('onSubmit="return false"', 'onSubmit={(e) => e.preventDefault()}')

    with open('src/App.jsx', 'w') as f2:
        f2.write(app_jsx)

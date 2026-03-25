import { useState, useEffect } from 'react';
import './Navigation.css';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'projects', 'about', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 300) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''} ${mobileMenuOpen ? 'nav--mobile-open' : ''}`}>
      <div className="nav__logo" onClick={() => scrollTo('hero')}>
        <span className="nav__logo-text" data-text="SHRIKAR">SHRIKAR</span>
        <span className="nav__logo-dot"></span>
      </div>

      <button
        type="button"
        className={`nav__toggle ${mobileMenuOpen ? 'nav__toggle--open' : ''}`}
        aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen((open) => !open)}
      >
        <span></span>
        <span></span>
      </button>

      <div className={`nav__links ${mobileMenuOpen ? 'nav__links--open' : ''}`}>
        {[
          { id: 'hero', label: 'HOME' },
          { id: 'projects', label: 'WORK' },
          { id: 'about', label: 'ABOUT' },
          { id: 'contact', label: 'CONTACT' },
        ].map(({ id, label }) => (
          <button
            key={id}
            className={`nav__link ${active === id ? 'nav__link--active' : ''}`}
            onClick={() => scrollTo(id)}
          >
            <span className="nav__link-label">{label}</span>
            {active === id && <span className="nav__link-indicator"></span>}
          </button>
        ))}
      </div>

      <div className="nav__status">
        <span className="nav__status-dot"></span>
        <span className="nav__status-text">SYS_ONLINE</span>
      </div>
    </nav>
  );
}

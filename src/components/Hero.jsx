import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

export default function Hero() {
  const sectionRef = useRef();
  const nameRef = useRef();
  const taglineRef = useRef();
  const descRef = useRef();
  const ctaRef = useRef();
  const hudRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(nameRef.current.querySelectorAll('.hero__letter'),
      { y: 120, opacity: 0, rotateX: -90 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.08, ease: 'power4.out' }
    )
    .fromTo(taglineRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(ctaRef.current,
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.2'
    )
    .fromTo(hudRef.current.children,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, stagger: 0.1 },
      '-=0.4'
    );
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={sectionRef} className="hero">
      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot"></span>
          FRONTEND_DEV // V1.7
        </div>

        <h1 ref={nameRef} className="hero__name">
          {'SHRIKAR'.split('').map((letter, i) => (
            <span key={i} className="hero__letter">{letter}</span>
          ))}
        </h1>

        <p ref={taglineRef} className="hero__tagline">
          <span className="hero__tagline-accent">CRAFTING</span> VISUAL-FIRST EXPERIENCES
        </p>

        <p ref={descRef} className="hero__desc">
          Building responsive, visual-first web experiences with React
          and modern frontend tooling. Specializing in UI engineering,
          3D web, and cinematic interactions.
        </p>

        <button ref={ctaRef} className="hero__cta" onClick={scrollToProjects}>
          <span className="hero__cta-text">VIEW PROJECTS</span>
          <span className="hero__cta-icon">→</span>
          <span className="hero__cta-glow"></span>
        </button>
      </div>

      <div ref={hudRef} className="hero__hud">
        <div className="hero__hud-item hero__hud-item--tl">
          <span>SYS_STATUS</span>
          <span className="hero__hud-value">OPERATIONAL</span>
        </div>
        <div className="hero__hud-item hero__hud-item--tr">
          <span>LAT: 18.5204</span>
          <span>LNG: 73.8567</span>
        </div>
        <div className="hero__hud-item hero__hud-item--bl">
          <span>SCROLL_TO_EXPLORE</span>
          <div className="hero__scroll-indicator">
            <div className="hero__scroll-line"></div>
          </div>
        </div>
        <div className="hero__hud-item hero__hud-item--br">
          <span>RENDER_TIME</span>
          <span className="hero__hud-value">0.042 MS</span>
        </div>
      </div>
    </section>
  );
}

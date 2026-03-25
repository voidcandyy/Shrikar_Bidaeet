import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: 'RAHRI_CSM',
    category: 'Web Application',
    desc: 'Modern Customer Service Management web application built with Next.js and TypeScript for streamlined service workflows.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    color: '#00D4FF',
    year: '2024',
    visual: 'neural',
    link: 'https://rahri.vercel.app/',
  },
  {
    id: 2,
    title: 'PURPLE_ONION',
    category: 'Restaurant Website',
    desc: 'Responsive restaurant website featuring modern UI design with optimized performance and smooth user experience.',
    tags: ['HTML', 'CSS', 'Bootstrap', 'JS'],
    color: '#7B2FFF',
    year: '2024',
    visual: 'void',
    link: 'https://purpleonionrestaurant.com/',
  },
  {
    id: 3,
    title: 'ARROW_PLUMBING',
    category: 'Business Website',
    desc: 'Professional business website with responsive layout, clean user experience, and cross-browser compatibility.',
    tags: ['HTML', 'CSS', 'Bootstrap', 'JS'],
    color: '#FF3CAC',
    year: '2023',
    visual: 'chroma',
    link: 'https://www.arrowplumbing.net/',
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });

    const visualRect = cardRef.current.querySelector('.project-card__visual');
    if (visualRect) {
      const vr = visualRect.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - vr.left) / vr.width) * 100,
        y: ((e.clientY - vr.top) / vr.height) * 100,
      });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`project-card ${isHovered ? 'project-card--active' : ''}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
        '--accent': project.color,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-card__glow"></div>

      <div className="project-card__header">
        <span className="project-card__category">{project.category}</span>
        <span className="project-card__year">v{project.year.slice(2)}</span>
      </div>

      <div className={`project-card__visual project-card__visual--${project.visual}`}>
        {/* Magnetic light follows cursor */}
        <div
          className="project-card__spotlight"
          style={{
            '--mx': `${mousePos.x}%`,
            '--my': `${mousePos.y}%`,
            opacity: isHovered ? 1 : 0,
          }}
        />
        {/* Decorative elements per visual type */}
        <div className="project-card__mesh" />
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.desc}</p>

      <div className="project-card__footer">
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>
        <a href={project.link} target="_blank" rel="noopener" className="project-card__btn">
          VIEW PROJECT <span>→</span>
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const titleRef = useRef();

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section id="projects" className="projects">
      <div className="projects__header" ref={titleRef}>
        <div className="projects__label">DEPLOYMENT / 2024</div>
        <h2 className="projects__title">PROJECTS</h2>
        <div className="projects__count">
          <span className="projects__count-num">03</span>
          <span className="projects__count-sep">/</span>
          <span className="projects__count-total">03</span>
        </div>
      </div>

      <div className="projects__grid">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: 'React.js', color: '#00D4FF' },
  { name: 'JavaScript', color: '#00D4FF' },
  { name: 'HTML5', color: '#FF3CAC' },
  { name: 'CSS3', color: '#7B2FFF' },
  { name: 'Tailwind CSS', color: '#00D4FF' },
  { name: 'Bootstrap', color: '#7B2FFF' },
  { name: 'Node.js', color: '#00FCC0' },
  { name: 'Express.js', color: '#00FCC0' },
  { name: 'MongoDB', color: '#00FCC0' },
  { name: 'Blender', color: '#FF3CAC' },
  { name: 'GSAP', color: '#00D4FF' },
  { name: 'Spline 3D', color: '#00FCC0' },
];

function ParticleSphere({ count = 2000 }) {
  const meshRef = useRef();
  const mousePos = useRef(new THREE.Vector3());
  const { viewport } = useThree();

  const sprite = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
  }, []);

  const { positions, originalPositions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const origPos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const radius = 2.5;
    const colorA = new THREE.Color('#00D4FF');
    const colorB = new THREE.Color('#7B2FFF');
    const colorC = new THREE.Color('#FF3CAC');

    for (let i = 0; i < count; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();
      const r = radius * (0.8 + Math.random() * 0.4);

      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;

      const rnd = Math.random();
      const color = rnd < 0.4 ? colorA : rnd < 0.7 ? colorB : colorC;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return { positions: pos, originalPositions: origPos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    meshRef.current.rotation.y = time * 0.15;
    meshRef.current.rotation.x = Math.sin(time * 0.08) * 0.2;

    const pointer = state.pointer;
    mousePos.current.set(
      pointer.x * viewport.width * 0.5,
      pointer.y * viewport.height * 0.5,
      0
    );

    const posArray = meshRef.current.geometry.attributes.position.array;
    const repelRadius = 1.5;
    const repelStrength = 0.8;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];
      const oz = originalPositions[idx + 2];

      const rotY = time * 0.15;
      const cosR = Math.cos(rotY);
      const sinR = Math.sin(rotY);
      const wx = ox * cosR + oz * sinR;
      const wy = oy;

      const dx = mousePos.current.x - wx;
      const dy = mousePos.current.y - wy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < repelRadius) {
        const force = (1 - dist / repelRadius) * repelStrength;
        posArray[idx] = ox - dx * force * 0.3;
        posArray[idx + 1] = oy - dy * force * 0.3;
        posArray[idx + 2] = oz + force * 0.2;
      } else {
        posArray[idx] += (ox - posArray[idx]) * 0.05;
        posArray[idx + 1] += (oy - posArray[idx + 1]) * 0.05;
        posArray[idx + 2] += (oz - posArray[idx + 2]) * 0.05;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={0.12}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function About() {
  const sectionRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    const els = textRef.current.querySelectorAll('.about__animate');
    gsap.fromTo(els,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about">

      <div className="about__layout">
        <div className="about__sphere-container">
          <Canvas
            camera={{ position: [0, 0, 7], fov: 50 }}
            dpr={[1, 2]}
            gl={{ antialias: false, alpha: true }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            <ParticleSphere />
          </Canvas>
          <div className="about__sphere-hud">
            <span>CORE_LOAD: 2.4MS</span>
            <span>PARTICLES: 2000</span>
          </div>
        </div>

        <div className="about__content" ref={textRef}>
          <div className="about__label">ABOUT</div>

          <div className="about__animate about__status">
            <span className="about__status-line"></span>
            USER IDENTITY CONFIRMED
          </div>

          <h2 className="about__animate about__name">WHO I AM</h2>
          <p className="about__animate about__role">Frontend Developer</p>

          <p className="about__animate about__bio">
            I am a front-end developer with 2+ years of professional experience
            building responsive and user-friendly websites. I specialize in
            frontend development using React, JavaScript, HTML, and CSS,
            with working knowledge of the MERN stack.
          </p>

          <p className="about__animate about__bio about__bio--dim">
            My background in UI development, graphics, and video editing helps me
            create interfaces that are both functional and visually appealing.
            I enjoy combining design thinking with development to build modern web experiences.
          </p>

          <div className="about__animate about__skills-label">
            <span className="about__skills-icon">◆</span>
            CORE_COMPETENCIES.EXE
          </div>

          <div className="about__animate about__skills">
            {SKILLS.map((skill) => (
              <span
                key={skill.name}
                className="about__skill"
                style={{ '--skill-color': skill.color }}
              >
                <span className="about__skill-indicator"></span>
                {skill.name}
              </span>
            ))}
          </div>

          <a href="/resume/ShrikarBidaeetResume.pdf" download className="about__animate about__download">
            DOWNLOAD RESUME
            <span className="about__download-icon">↓</span>
          </a>
        </div>
      </div>

      <div className="about__hud-corner about__hud-corner--tr">
        <span>VISUAL: VALID</span>
        <span>INTERNAL: SECTOR_01</span>
      </div>
    </section>
  );
}

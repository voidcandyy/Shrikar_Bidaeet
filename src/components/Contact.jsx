import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = 'shrikarbidaeet83@gmail.com';
const FORM_ENDPOINT = `https://formsubmit.co/${CONTACT_EMAIL}`;

const LOG_MESSAGES = [
  { text: 'INITIALIZING SECURE CHANNEL...', delay: 0 },
  { text: 'ENCRYPTION: AES-256-GCM', delay: 0.5 },
  { text: 'PROTOCOL: HTTPS/3.0', delay: 0.8 },
  { text: 'SIGNAL STRENGTH: ████████░░ 82%', delay: 1.2 },
  { text: 'HANDSHAKE COMPLETE', delay: 1.6 },
  { text: 'CHANNEL READY — AWAITING INPUT', delay: 2.0 },
];

const SOCIALS = [
  { name: 'GITHUB', icon: '{ }', url: 'https://github.com/shrikarbidaeet83?tab=repositories' },
  { name: 'LINKEDIN', icon: '◈', url: 'https://www.linkedin.com/in/shrikarbidaeet/' },
  { name: 'TWITTER', icon: '✦', url: 'https://x.com/Shrikar_bidaeet' },
  { name: 'EMAIL', icon: '◉', url: `mailto:${CONTACT_EMAIL}` },
];

export default function Contact() {
  const sectionRef = useRef();
  const terminalRef = useRef();
  const [logs, setLogs] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setSending] = useState(false);
  const [cursorField, setCursorField] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}`
    : '';
  const formUrl = baseUrl ? `${baseUrl}#contact` : '';
  const successUrl = baseUrl ? `${baseUrl}?contact=success#contact` : '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          LOG_MESSAGES.forEach((log, i) => {
            setTimeout(() => {
              setLogs((prev) => [...prev, log.text]);
            }, log.delay * 1000);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('contact') !== 'success') return;

    setStatusMessage(`Transmission complete. Notifications are routed to ${CONTACT_EMAIL}.`);
    setLogs((prev) => [
      ...prev,
      `> INBOX ROUTED: ${CONTACT_EMAIL.toUpperCase()}`,
      '> TRANSMISSION COMPLETE ✓',
    ]);
    window.history.replaceState({}, document.title, `${baseUrl}#contact`);
  }, [baseUrl]);

  useEffect(() => {
    if (terminalRef.current) {
      gsap.fromTo(
        terminalRef.current.querySelectorAll('.contact__animate'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }
  }, []);

  const handleSubmit = () => {
    setSending(true);
    setStatusMessage(`Routing submission to ${CONTACT_EMAIL}...`);
    setLogs((prev) => [...prev, `> ROUTING SUBMISSION TO: ${CONTACT_EMAIL.toUpperCase()}...`]);
  };

  return (
    <section id="contact" ref={sectionRef} className="contact">
      <div className="contact__layout" ref={terminalRef}>
        {/* Left: Info + System Log */}
        <div className="contact__info">
          <div className="contact__animate contact__label">
            <span className="contact__label-line"></span>
            GET IN TOUCH
          </div>

          <h2 className="contact__animate contact__heading">
            ESTABLISH<br />
            <span className="contact__heading-accent">CONNECTION</span>
          </h2>

          <p className="contact__animate contact__desc">
            Looking to build responsive, visual-first web experiences?
            My terminal is open for frontend collaborations, UI engineering,
            and modern web development projects.
          </p>

          <div className="contact__animate contact__availability">
            <div className="contact__avail-item">
              <span className="contact__avail-label">STATUS</span>
              <span className="contact__avail-value contact__avail-value--green">
                <span className="contact__avail-dot"></span>
                AVAILABLE FOR HIRE
              </span>
            </div>
            <div className="contact__avail-item">
              <span className="contact__avail-label">RESPONSE_TIME</span>
              <span className="contact__avail-value">&lt; 24 HOURS</span>
            </div>
          </div>

          {/* System Log */}
          <div className="contact__animate contact__log">
            <div className="contact__log-header">
              <span className="contact__log-dots">
                <span></span><span></span><span></span>
              </span>
              <span className="contact__log-title">SYSTEM_LOG</span>
            </div>
            <div className="contact__log-body">
              {logs.map((log, i) => (
                <div key={i} className="contact__log-line">
                  <span className="contact__log-prefix">[{String(i).padStart(2, '0')}]</span>
                  {log}
                </div>
              ))}
              <span className="contact__log-cursor">█</span>
            </div>
          </div>
        </div>

        {/* Right: Terminal Form */}
        <div className="contact__animate contact__terminal">
          <div className="contact__terminal-header">
            <span className="contact__terminal-dots">
              <span style={{ background: '#ff5f57' }}></span>
              <span style={{ background: '#ffbd2e' }}></span>
              <span style={{ background: '#28c840' }}></span>
            </span>
            <span className="contact__terminal-title">TRANSMISSION_PROTOCOL: SECURE</span>
            <span className="contact__terminal-id">ID: {Math.random().toString(36).slice(2, 8).toUpperCase()}</span>
          </div>

          <div className="contact__terminal-scanline"></div>

          <form className="contact__form" action={FORM_ENDPOINT} method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="New portfolio contact submission" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value={successUrl} />
            <input type="hidden" name="_url" value={formUrl} />
            <input
              type="text"
              name="_honey"
              className="contact__honeypot"
              tabIndex="-1"
              autoComplete="off"
            />

            <div className="contact__field">
              <label className="contact__field-label">SUBJECT_NAME</label>
              <div className={`contact__field-input ${cursorField === 'name' ? 'contact__field-input--active' : ''}`}>
                <span className="contact__field-prefix">&gt;</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setCursorField('name')}
                  onBlur={() => setCursorField(null)}
                  placeholder="ENTER IDENTIFIER"
                  autoComplete="name"
                  required
                />
                {cursorField === 'name' && <span className="contact__blink">█</span>}
              </div>
            </div>

            <div className="contact__field">
              <label className="contact__field-label">CONTACT_BRIDGE</label>
              <div className={`contact__field-input ${cursorField === 'email' ? 'contact__field-input--active' : ''}`}>
                <span className="contact__field-prefix">&gt;</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setCursorField('email')}
                  onBlur={() => setCursorField(null)}
                  placeholder="NAME@NETWORK.COM"
                  autoComplete="email"
                  required
                />
                {cursorField === 'email' && <span className="contact__blink">█</span>}
              </div>
            </div>

            <div className="contact__field">
              <label className="contact__field-label">DATA_PAYLOAD</label>
              <div className={`contact__field-input contact__field-input--textarea ${cursorField === 'msg' ? 'contact__field-input--active' : ''}`}>
                <span className="contact__field-prefix">&gt;</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setCursorField('msg')}
                  onBlur={() => setCursorField(null)}
                  placeholder="DESCRIBE YOUR OBJECTIVE..."
                  rows={4}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`contact__submit ${isSending ? 'contact__submit--sending' : ''}`}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <span className="contact__submit-progress"></span>
                  TRANSMITTING...
                </>
              ) : (
                <>INITIATE SEND <span>⟩</span></>
              )}
            </button>

            <p className="contact__form-status">{statusMessage || `Incoming submissions are routed to ${CONTACT_EMAIL}.`}</p>
          </form>
        </div>
      </div>

      {/* Social Links */}
      <div className="contact__socials">
        {SOCIALS.map((social) => (
          <a key={social.name} href={social.url} className="contact__social" target="_blank" rel="noopener">
            <span className="contact__social-icon">{social.icon}</span>
            <span className="contact__social-name">{social.name}</span>
          </a>
        ))}
        <a href={`mailto:${CONTACT_EMAIL}`} className="contact__social-email">
          <span className="contact__social-icon">◉</span>
          {CONTACT_EMAIL}
        </a>
      </div>

      <div className="contact__footer">
        <span>SYS_STATUS: OPTIMIZED | LOAD: 0.042MS</span>
        <span>©{new Date().getFullYear()} SHRIKAR.DEV</span>
      </div>
    </section>
  );
}

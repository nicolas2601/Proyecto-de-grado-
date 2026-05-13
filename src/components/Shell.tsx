import { useEffect, useRef, useState } from 'react';
import { SECCIONES } from '@/data/content';
import Section00Inicio from '@/components/sections/Section00Inicio';
import Section01Introduccion from '@/components/sections/Section01Introduccion';
import Section02Problema from '@/components/sections/Section02Problema';
import Section03Pregunta from '@/components/sections/Section03Pregunta';
import Section04Justificacion from '@/components/sections/Section04Justificacion';
import Section05Alcance from '@/components/sections/Section05Alcance';
import Section06Objetivos from '@/components/sections/Section06Objetivos';
import Section07Resultados from '@/components/sections/Section07Resultados';
import Section08MarcoTeorico from '@/components/sections/Section08MarcoTeorico';
import Section09MarcoNormativo from '@/components/sections/Section09MarcoNormativo';
import Section10Antecedentes from '@/components/sections/Section10Antecedentes';
import Section11Contexto from '@/components/sections/Section11Contexto';
import Section12Metodologia from '@/components/sections/Section12Metodologia';
import Section13Cronograma from '@/components/sections/Section13Cronograma';
import Section14Avances from '@/components/sections/Section14Avances';
import Section15Referencias from '@/components/sections/Section15Referencias';

const SECTION_COMPONENTS = [
  Section00Inicio,
  Section01Introduccion,
  Section02Problema,
  Section03Pregunta,
  Section04Justificacion,
  Section05Alcance,
  Section06Objetivos,
  Section07Resultados,
  Section08MarcoTeorico,
  Section09MarcoNormativo,
  Section10Antecedentes,
  Section11Contexto,
  Section12Metodologia,
  Section13Cronograma,
  Section14Avances,
  Section15Referencias,
];

export default function Shell() {
  const [current, setCurrent] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Reset scroll on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // IntersectionObserver to track active section
  useEffect(() => {
    const sections = document.querySelectorAll('[data-section-idx]');
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.45) {
            const idx = Number((e.target as HTMLElement).dataset.sectionIdx);
            setCurrent(idx);
          }
        });
        document.querySelectorAll('.reveal').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.88) {
            el.classList.add('is-visible');
          }
        });
      },
      { threshold: [0.45, 0.6, 0.8] }
    );
    sections.forEach((s) => observerRef.current!.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const total = SECTION_COMPONENTS.length;
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          scrollToSection(Math.min(current + 1, total - 1));
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          scrollToSection(Math.max(current - 1, 0));
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(total - 1);
          break;
        case 'Escape':
          setNavOpen(false);
          break;
        case 'm':
        case 'M':
          setNavOpen((v) => !v);
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current]);

  const scrollToSection = (idx: number) => {
    const el = document.querySelector(`[data-section-idx="${idx}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* ── Floating top nav · pill ─────────────────────────── */}
      <header className="no-print fixed top-4 left-0 right-0 z-50 px-4 md:px-6 pointer-events-none">
        <div
          className="max-w-[1380px] mx-auto pointer-events-auto flex items-center gap-3 lg:gap-5"
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(14px) saturate(140%)',
            WebkitBackdropFilter: 'blur(14px) saturate(140%)',
            borderRadius: 9999,
            border: '1px solid rgba(15, 44, 69, 0.08)',
            padding: '6px 8px 6px 18px',
            boxShadow: '0 4px 18px -8px rgba(15, 44, 69, 0.12)',
          }}
        >
          {/* Brand */}
          <button
            onClick={() => scrollToSection(0)}
            className="flex items-center gap-2.5 shrink-0"
            style={{ background: 'none', border: 0, cursor: 'pointer' }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                background: '#0F2C45',
                borderRadius: 6,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: '-0.02em',
                color: '#0F2C45',
              }}
              className="hidden sm:inline"
            >
              SSL · UNAB
            </span>
          </button>

          {/* Section pills · centered horizontal scroll on lg */}
          <nav
            className="hidden lg:flex items-center gap-1 flex-1 overflow-x-auto"
            style={{ scrollbarWidth: 'none' }}
          >
            {SECCIONES.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                style={{
                  appearance: 'none',
                  background: current === s.id ? '#0F2C45' : 'transparent',
                  color: current === s.id ? '#FFFFFF' : '#4D5B6D',
                  border: 0,
                  padding: '7px 12px',
                  borderRadius: 9999,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12.5,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background-color 180ms cubic-bezier(0.16, 1, 0.3, 1), color 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  if (current !== s.id) {
                    (e.currentTarget as HTMLButtonElement).style.background = '#E6EBED';
                  }
                }}
                onMouseLeave={(e) => {
                  if (current !== s.id) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }
                }}
              >
                <span
                  style={{
                    opacity: 0.6,
                    marginRight: 5,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                  }}
                >
                  {String(s.id).padStart(2, '0')}
                </span>
                {s.label}
              </button>
            ))}
          </nav>

          {/* Section counter (md only) */}
          <div
            className="hidden md:flex lg:hidden items-center gap-2 px-3 py-1.5 flex-1 justify-center"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: '#4D5B6D',
            }}
          >
            <span
              style={{
                fontWeight: 600,
                color: '#0F2C45',
              }}
            >
              {String(current).padStart(2, '0')}
            </span>
            <span style={{ opacity: 0.5 }}>/</span>
            <span>{String(SECCIONES.length - 1).padStart(2, '0')}</span>
            <span style={{ marginLeft: 8, color: '#1A2332', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
              {SECCIONES[current]?.label}
            </span>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setNavOpen((v) => !v)}
            className="lg:hidden ml-auto"
            style={{
              appearance: 'none',
              background: '#0F2C45',
              color: '#FFFFFF',
              border: 0,
              padding: '8px 14px',
              borderRadius: 9999,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}
            aria-label="Open menu"
          >
            {navOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* ── Mobile fullscreen nav ─────────────────────────── */}
      {navOpen && (
        <div
          className="no-print fixed inset-0 z-40 lg:hidden flex flex-col p-6 pt-24"
          style={{
            background: 'rgba(241, 244, 244, 0.96)',
            backdropFilter: 'blur(24px) saturate(140%)',
            WebkitBackdropFilter: 'blur(24px) saturate(140%)',
          }}
        >
          <div className="max-w-md mx-auto w-full flex flex-col gap-2">
            {SECCIONES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  scrollToSection(s.id);
                  setNavOpen(false);
                }}
                style={{
                  appearance: 'none',
                  background: current === s.id ? '#0F2C45' : '#FFFFFF',
                  color: current === s.id ? '#FFFFFF' : '#0F2C45',
                  border: '1px solid #D3DAE0',
                  padding: '14px 20px',
                  borderRadius: 14,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 17,
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  animation: `fadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.03}s both`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: current === s.id ? 'rgba(255,255,255,0.5)' : '#8C99A8',
                    minWidth: 24,
                  }}
                >
                  {String(s.id).padStart(2, '0')}
                </span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
          <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
      )}

      {/* ── Bottom progress indicator (subtle, no chrome) ─── */}
      <div
        className="no-print fixed bottom-5 left-5 z-30 pointer-events-none hidden md:flex items-center gap-2"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(15, 44, 69, 0.08)',
          borderRadius: 9999,
          padding: '7px 14px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.02em',
          color: '#0F2C45',
          fontWeight: 500,
        }}
      >
        <span className="dot-pulse" />
        <span>{String(current).padStart(2, '0')}</span>
        <span style={{ color: '#8C99A8' }}>/{String(SECCIONES.length - 1).padStart(2, '0')}</span>
        <span style={{ width: 1, height: 12, background: 'rgba(15,44,69,0.15)', marginInline: 6 }} />
        <span style={{ color: '#4D5B6D', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
          {SECCIONES[current]?.label}
        </span>
      </div>

      {/* Sections */}
      <main className="relative">
        {SECTION_COMPONENTS.map((Section, idx) => (
          <section
            key={idx}
            data-section-idx={idx}
            id={`section-${idx}`}
            className="section relative"
          >
            <Section />
          </section>
        ))}
      </main>
    </>
  );
}

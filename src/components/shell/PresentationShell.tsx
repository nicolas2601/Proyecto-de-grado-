import { useEffect, useState, useRef } from 'react';
import { TOTAL_SECONDS, slideTimings } from '@/data/eda';
import { cn } from '@/lib/utils';
import ClickSpark from '@/components/reactbits/ClickSpark';
import BlobCursor from '@/components/reactbits/BlobCursor';
import SlideProgress from '@/components/reactbits/SlideProgress';
import { getLenis, scrollToSlide, destroyLenis } from '@/lib/scroll';

import Slide00Cover from '@/components/slides/Slide00Cover';
import Slide01Context from '@/components/slides/Slide01Context';
import Slide02Question from '@/components/slides/Slide02Question';
import Slide03Objectives from '@/components/slides/Slide03Objectives';
import Slide04Framework from '@/components/slides/Slide04Framework';
import Slide05Methodology from '@/components/slides/Slide05Methodology';
import Slide06EDA from '@/components/slides/Slide06EDA';
import Slide07Results from '@/components/slides/Slide07Results';
import Slide08Closing from '@/components/slides/Slide08Closing';

const SLIDE_COMPONENTS = [
  Slide00Cover,
  Slide01Context,
  Slide02Question,
  Slide03Objectives,
  Slide04Framework,
  Slide05Methodology,
  Slide06EDA,
  Slide07Results,
  Slide08Closing,
];

const NAV_SECTIONS: Array<{ idx: number; label: string }> = [
  { idx: 0, label: 'Portada' },
  { idx: 1, label: 'Contexto' },
  { idx: 2, label: 'Pregunta' },
  { idx: 3, label: 'Objetivos' },
  { idx: 4, label: 'Marco' },
  { idx: 5, label: 'Metodología' },
  { idx: 6, label: 'EDA' },
  { idx: 7, label: 'Plan B' },
  { idx: 8, label: 'Cierre' },
];

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function PresentationShell() {
  const [current, setCurrent] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
    getLenis();
    return () => destroyLenis();
  }, []);

  useEffect(() => {
    const slides = document.querySelectorAll('[data-slide-idx]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.4) {
            const idx = Number((e.target as HTMLElement).dataset.slideIdx);
            setCurrent(idx);
          }
        });
        document.querySelectorAll('.reveal').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.85) el.classList.add('is-visible');
        });
      },
      { threshold: [0.4, 0.6, 0.8] }
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const goTo = (idx: number) => scrollToSlide(idx);
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          goTo(Math.min(current + 1, slideTimings.length - 1));
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          goTo(Math.max(current - 1, 0));
          break;
        case 'Home':
          e.preventDefault();
          goTo(0);
          break;
        case 'End':
          e.preventDefault();
          goTo(slideTimings.length - 1);
          break;
        case 'n':
        case 'N':
          setShowNotes((v) => !v);
          break;
        case 't':
        case 'T':
          setRunning((v) => !v);
          if (!running) startRef.current = Date.now() - elapsed * 1000;
          break;
        case 'r':
        case 'R':
          setElapsed(0);
          setRunning(false);
          startRef.current = null;
          break;
        case '6':
          e.preventDefault();
          goTo(6);
          break;
        case 'm':
        case 'M':
          setNavOpen((v) => !v);
          break;
        case 'Escape':
          setNavOpen(false);
          setShowNotes(false);
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, running, elapsed]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      if (startRef.current) {
        setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
      }
    }, 250);
    return () => clearInterval(interval);
  }, [running]);

  const slideMeta = slideTimings[current];
  const cumulativeTarget = slideTimings.slice(0, current + 1).reduce((a, s) => a + s.seconds, 0);
  const overdue = elapsed > cumulativeTarget;

  return (
    <>
      {/* Difference-blend cursor */}
      <BlobCursor />
      <ClickSpark sparkColor="#000000" sparkCount={10} sparkRadius={18} duration={420} />
      <SlideProgress />

      {/* ── Sticky top nav · Dayos floating pill ────────── */}
      <header className="no-print fixed top-4 left-0 right-0 z-50 px-4 md:px-6 pointer-events-none">
        <div
          className="max-w-[1440px] mx-auto pointer-events-auto"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(14px) saturate(140%)',
            WebkitBackdropFilter: 'blur(14px) saturate(140%)',
            borderRadius: 9999,
            border: '1px solid rgba(0, 0, 0, 0.06)',
            padding: '6px 6px 6px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
          }}
        >
          {/* Brand */}
          <a
            href="#slide-0"
            onClick={(e) => {
              e.preventDefault();
              scrollToSlide(0);
            }}
            className="flex items-center gap-2.5"
            style={{ color: '#000000', textDecoration: 'none' }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                background: '#000000',
                borderRadius: 6,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: '-0.42px',
                color: '#000000',
              }}
            >
              SSL · UNAB
            </span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: '-0.33px',
                color: '#979797',
                marginLeft: 6,
              }}
              className="hidden md:inline"
            >
              · 2026
            </span>
          </a>

          {/* Section pills */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.idx}
                onClick={() => scrollToSlide(s.idx)}
                style={{
                  appearance: 'none',
                  background: current === s.idx ? '#000000' : 'transparent',
                  color: current === s.idx ? '#ffffff' : '#444444',
                  border: 0,
                  padding: '8px 14px',
                  borderRadius: 12,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '-0.39px',
                  cursor: 'pointer',
                  transition: 'background-color 200ms cubic-bezier(0.16, 1, 0.3, 1), color 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  if (current !== s.idx) {
                    (e.currentTarget as HTMLButtonElement).style.background = '#f3f3f3';
                  }
                }}
                onMouseLeave={(e) => {
                  if (current !== s.idx) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }
                }}
              >
                <span style={{ opacity: 0.7, marginRight: 6, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>
                  {String(s.idx).padStart(2, '0')}
                </span>
                {s.label}
              </button>
            ))}
          </nav>

          {/* Timer cluster */}
          <button
            type="button"
            onClick={() => {
              setRunning((v) => {
                if (!v) startRef.current = Date.now() - elapsed * 1000;
                return !v;
              });
            }}
            className="hidden md:flex items-center gap-2"
            style={{
              appearance: 'none',
              background: 'transparent',
              border: 0,
              padding: '6px 12px',
              borderRadius: 9999,
              cursor: 'pointer',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              letterSpacing: '-0.36px',
              color: overdue ? '#000000' : '#444444',
            }}
            title="Toggle timer (T)"
          >
            <span
              className={cn('pulse-dot', running && 'pulse-dot-ink')}
              style={{ background: running ? '#000000' : '#d1ffca' }}
            />
            <span className="tabular-nums">
              {formatTime(elapsed)} <span style={{ color: '#979797' }}>/ {formatTime(TOTAL_SECONDS)}</span>
            </span>
          </button>

          {/* Notes toggle + nav toggle (mobile) */}
          <button
            type="button"
            onClick={() => setShowNotes((v) => !v)}
            style={{
              appearance: 'none',
              background: showNotes ? '#000000' : 'transparent',
              color: showNotes ? '#ffffff' : '#444444',
              border: '1px solid ' + (showNotes ? '#000000' : 'rgba(0,0,0,0.08)'),
              padding: '8px 14px',
              borderRadius: 9999,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '-0.39px',
              cursor: 'pointer',
              transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            title="Toggle presenter notes (N)"
          >
            Notas
          </button>

          {/* Mobile nav toggle */}
          <button
            type="button"
            onClick={() => setNavOpen((v) => !v)}
            className="lg:hidden"
            style={{
              appearance: 'none',
              background: '#000000',
              color: '#ffffff',
              border: 0,
              padding: '10px 14px',
              borderRadius: 9999,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}
            aria-label="Open navigation menu"
          >
            {navOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* ── Mobile fullscreen nav ───────────────── */}
      {navOpen && (
        <div
          className="no-print fixed inset-0 z-40 lg:hidden flex flex-col items-stretch p-6"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(24px) saturate(140%)',
            WebkitBackdropFilter: 'blur(24px) saturate(140%)',
            paddingTop: 96,
          }}
        >
          <div className="max-w-md mx-auto w-full flex flex-col gap-2">
            {NAV_SECTIONS.map((s, i) => (
              <button
                key={s.idx}
                onClick={() => {
                  scrollToSlide(s.idx);
                  setNavOpen(false);
                }}
                style={{
                  appearance: 'none',
                  background: current === s.idx ? '#000000' : '#ffffff',
                  color: current === s.idx ? '#ffffff' : '#000000',
                  border: '1px solid rgba(0,0,0,0.08)',
                  padding: '16px 24px',
                  borderRadius: 16,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: '-0.72px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  animation: `fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s both`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 12,
                    color: current === s.idx ? 'rgba(255,255,255,0.5)' : '#979797',
                    minWidth: 28,
                  }}
                >
                  {String(s.idx).padStart(2, '0')}
                </span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
          <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
      )}

      {/* Slide indicator bottom-left — Dayos style chip */}
      <div className="no-print fixed bottom-5 left-5 z-30 pointer-events-none hidden md:block">
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            borderRadius: 9999,
            padding: '8px 14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: '-0.33px',
              color: '#000000',
              fontWeight: 500,
            }}
          >
            {String(current + 1).padStart(2, '0')} <span style={{ color: '#979797' }}>/ 09</span>
          </span>
          <span style={{ width: 1, height: 12, background: 'rgba(0,0,0,0.12)' }} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: '#444444',
              letterSpacing: '-0.36px',
            }}
          >
            {slideMeta?.name}
          </span>
        </div>
      </div>

      {/* Presenter notes */}
      {showNotes && (
        <PresenterNotes
          slideIdx={current}
          elapsed={elapsed}
          cumulativeTarget={cumulativeTarget}
        />
      )}

      {/* Slides */}
      <main className="relative">
        {SLIDE_COMPONENTS.map((Slide, idx) => (
          <section
            key={idx}
            data-slide-idx={idx}
            className="slide relative"
            id={`slide-${idx}`}
          >
            <Slide />
          </section>
        ))}
      </main>
    </>
  );
}

function PresenterNotes({
  slideIdx,
  elapsed,
  cumulativeTarget,
}: {
  slideIdx: number;
  elapsed: number;
  cumulativeTarget: number;
}) {
  const notes = SLIDE_NOTES[slideIdx] ?? 'Sin notas para esta sección.';
  const delta = elapsed - cumulativeTarget;
  const onTrack = Math.abs(delta) < 30;
  return (
    <div
      className="no-print fixed bottom-16 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[92vw]"
      style={{
        background: 'rgba(0, 0, 0, 0.92)',
        backdropFilter: 'blur(20px) saturate(140%)',
        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        color: '#ffffff',
        borderRadius: 24,
        padding: 24,
      }}
    >
      <div className="flex items-center justify-between mb-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '-0.33px',
            color: '#979797',
          }}
        >
          Notas · slide {String(slideIdx).padStart(2, '0')}
        </span>
        <span
          className="tabular-nums"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            color: onTrack ? '#d1ffca' : delta > 0 ? '#fff100' : '#979797',
            fontWeight: 500,
          }}
        >
          {delta > 0 ? `+${delta}s atrasado` : delta < 0 ? `${delta}s margen` : 'en tiempo'}
        </span>
      </div>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: 16,
          lineHeight: 1.5,
          letterSpacing: '-0.42px',
          color: '#ffffff',
        }}
      >
        {notes}
      </p>
      <p
        className="mt-4 pt-3"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          color: '#979797',
          letterSpacing: '-0.33px',
          borderTop: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        ← / → navegar · espacio avanzar · 6 saltar a EDA · T timer · R reset · N notas · M menú
      </p>
    </div>
  );
}

const SLIDE_NOTES: Record<number, string> = {
  0: 'Saludo breve. Nombre del proyecto, autores y rol de Karen Sánchez como asesora desde KAUST. 20 segundos máximo.',
  1: 'Establece la motivación clínica. Tres datos clave: CBC 124,2/100k (Uribe 2018), 15 % del HIC, brote de leishmaniasis +338 %. No te quedes en cifras, conecta con el problema diagnóstico.',
  2: 'Lee la pregunta literal. Pausa de 2 segundos. Lee la hipótesis. Conecta: "para responderla decidimos…" → siguiente slide.',
  3: 'Justificación rápida (epidemio + escasez de etiquetas + apoyo regional). Alcance: NO clínico, NO recolección. Cuatro objetivos en orden — destaca que el 1 ya está terminado.',
  4: 'No leas todo. Habla de SSL como familia (contrastive vs generative). Menciona Grad-CAM como explicabilidad. Normativa: di "GDPR + AI Act + Helsinki + cuatro normas colombianas". Antecedentes: dos tesis UIS + Sánchez 2023.',
  5: 'CRISP-DM circular: fases 1-2 hechas, 3-6 por hacer. Gantt: tres semestres. No te detengas en detalles.',
  6: 'PLATO FUERTE — 4:30 disponibles. Cuenta la historia: 3 datasets analizados, 13 figuras generadas. Para cada dataset menciona N, balance y un hallazgo. Conclusión: HAM+BCN núcleo, CO2Wounds-V2 trabajo futuro.',
  7: 'TRL 4 como objetivo, TRL 5 como stretch. Cuatro entregables. Riesgos: R1 y R2 son los críticos.',
  8: 'Agradecer brevemente al director y a Karen. "Quedo atento a sus preguntas."',
};

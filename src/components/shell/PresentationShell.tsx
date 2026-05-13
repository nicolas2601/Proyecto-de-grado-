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
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset scroll to top on mount — prevents browser scroll-restoration from
    // dropping the user into a half-loaded mid-slide on hot reload / refresh.
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
      {/* Difference-blend MONO cursor — inverts content for visibility on light & dark zones */}
      <BlobCursor />
      {/* Click sparks · ink black only */}
      <ClickSpark sparkColor="#292929" sparkCount={10} sparkRadius={18} duration={420} />
      <SlideProgress />

      {/* Cumulative-target marker · 1px black tick on a 1px grey track */}
      <div className="no-print fixed top-0 left-0 right-0 z-50 h-px pointer-events-none border-b border-grey-100">
        <div
          className="absolute top-0 h-full w-px bg-ink-black"
          style={{ left: `${(cumulativeTarget / TOTAL_SECONDS) * 100}%` }}
        />
      </div>

      {/* Top-right control cluster · 1px ink border, no blur */}
      <div className="no-print fixed top-5 right-5 z-50 flex items-stretch gap-0">
        <div
          className="flex items-center gap-3 px-3 py-1.5 text-[12px]"
          style={{
            background: '#ffffff',
            border: '1px solid #292929',
            borderRadius: 0,
            fontFamily: 'Oswald, Impact, sans-serif',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#292929',
          }}
        >
          <span className="tabular-nums">
            <span className="font-medium">{String(current + 1).padStart(2, '0')}</span>
            <span className="opacity-50"> / {String(slideTimings.length).padStart(2, '0')}</span>
          </span>
          <span className="h-3 w-px bg-ink-black/40" />
          <button
            type="button"
            onClick={() => {
              setRunning((v) => {
                if (!v) startRef.current = Date.now() - elapsed * 1000;
                return !v;
              });
            }}
            className={cn(
              'tabular-nums',
              running && 'animate-pulse'
            )}
            style={{
              fontFamily: 'JetBrains Mono, ui-monospace, monospace',
              letterSpacing: 0,
              color: overdue ? '#000000' : '#292929',
              fontWeight: overdue ? 500 : 400,
            }}
            title="Toggle timer (T)"
          >
            {formatTime(elapsed)}
          </button>
          <span style={{ fontFamily: 'JetBrains Mono, ui-monospace, monospace', letterSpacing: 0, color: '#b4b8b4' }}>
            / {formatTime(TOTAL_SECONDS)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowNotes((v) => !v)}
          className="w-9 flex items-center justify-center transition-colors"
          style={{
            background: showNotes ? '#292929' : '#ffffff',
            color: showNotes ? '#ffffff' : '#292929',
            border: '1px solid #292929',
            borderLeft: 'none',
            borderRadius: 0,
            fontFamily: 'Oswald, Impact, sans-serif',
            letterSpacing: '0.1em',
            fontSize: 12,
          }}
          title="Toggle presenter notes (N)"
        >
          N
        </button>
      </div>

      {/* Slide name (bottom-left) · Oswald label */}
      <div className="no-print fixed bottom-5 left-5 z-40 pointer-events-none">
        <span
          style={{
            fontFamily: 'Oswald, Impact, sans-serif',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontSize: 11,
            color: '#292929',
          }}
        >
          {String(current).padStart(2, '0')} · {slideMeta?.name}
        </span>
      </div>

      {/* Slide thumbnails (bottom-right) · pure ink numeric chips */}
      <nav
        className="no-print fixed bottom-5 right-5 z-40 flex gap-0"
        style={{ border: '1px solid #292929', background: '#ffffff' }}
      >
        {slideTimings.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToSlide(s.id)}
            className="tabular-nums flex items-center justify-center transition-colors"
            style={{
              width: 28,
              height: 28,
              fontFamily: 'Oswald, Impact, sans-serif',
              fontSize: 11,
              letterSpacing: '0.1em',
              background: current === s.id ? '#292929' : '#ffffff',
              color: current === s.id ? '#ffffff' : '#292929',
              borderRight: idx < slideTimings.length - 1 ? '1px solid #292929' : 'none',
              borderRadius: 0,
            }}
            title={s.name}
          >
            {String(s.id).padStart(2, '0')}
          </button>
        ))}
      </nav>

      {/* Presenter notes overlay · white card 1px ink border */}
      {showNotes && (
        <PresenterNotes
          slideIdx={current}
          elapsed={elapsed}
          cumulativeTarget={cumulativeTarget}
        />
      )}

      {/* Slides + vertical section indicator (left rail) */}
      <main className="relative">
        {SLIDE_COMPONENTS.map((Slide, idx) => (
          <section
            key={idx}
            data-slide-idx={idx}
            className="slide relative"
            id={`slide-${idx}`}
          >
            <div className="no-print absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 pointer-events-none">
              {SLIDE_COMPONENTS.map((_, j) => (
                <span
                  key={j}
                  className="transition-all duration-300"
                  style={{
                    display: 'block',
                    width: j === idx ? 14 : 6,
                    height: 1,
                    background: '#292929',
                    opacity: j === idx ? 1 : 0.25,
                  }}
                />
              ))}
            </div>
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
      className="no-print fixed bottom-16 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[92vw]"
      style={{
        background: '#ffffff',
        border: '1px solid #292929',
        borderRadius: 0,
        padding: 20,
      }}
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-grey-100">
        <span
          style={{
            fontFamily: 'Oswald, Impact, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontSize: 11,
            color: '#292929',
          }}
        >
          Notas · slide {String(slideIdx).padStart(2, '0')}
        </span>
        <span
          className={cn('tabular-nums')}
          style={{
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            fontSize: 11,
            color: onTrack ? '#292929' : delta > 0 ? '#000000' : '#646464',
            fontWeight: onTrack ? 400 : 500,
          }}
        >
          {delta > 0 ? `+${delta}s atrasado` : delta < 0 ? `${delta}s margen` : 'en tiempo'}
        </span>
      </div>
      <p
        style={{
          fontFamily: 'Inter, Helvetica Neue, sans-serif',
          fontWeight: 400,
          fontSize: 15,
          lineHeight: 1.5,
          letterSpacing: '-0.02em',
          color: '#292929',
        }}
      >
        {notes}
      </p>
      <p
        className="mt-3 pt-2 border-t border-grey-100"
        style={{
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: 10,
          color: '#646464',
          letterSpacing: 0,
        }}
      >
        ← / → navegar · espacio avanzar · 6 saltar a EDA · T timer · R reset · N notas
      </p>
    </div>
  );
}

const SLIDE_NOTES: Record<number, string> = {
  0: 'Saludo breve. Nombre del proyecto, autores y rol de Karen Sánchez como asesora desde KAUST. 20 segundos máximo.',
  1: 'Establece la motivación clínica. Tres datos clave: CBC 124,2/100k (Uribe 2018), 15 % del HIC, brote de leishmaniasis +338 %. No te quedes en cifras, conecta con el problema diagnóstico.',
  2: 'Lee la pregunta literal. Pausa de 2 segundos. Lee la hipótesis. Conecta: "para responderla decidimos…" → siguiente slide.',
  3: 'Justificación rápida (epidemio + escasez de etiquetas + apoyo regional). Alcance: NO clínico, NO recolección. Cuatro objetivos en orden · destaca que el 1 ya está terminado.',
  4: 'No leas todo. Habla de SSL como familia (contrastive vs generative). Menciona Grad-CAM como explicabilidad. Normativa: di "GDPR + AI Act + Helsinki + cuatro normas colombianas". Antecedentes: dos tesis UIS + Sánchez 2023.',
  5: 'CRISP-DM circular: fases 1-2 hechas, 3-6 por hacer. Gantt: tres semestres. No te detengas en detalles.',
  6: 'PLATO FUERTE · 4:30 disponibles. Cuenta la historia: 3 datasets analizados, 13 figuras generadas. Para cada dataset menciona N, balance y un hallazgo. Conclusión: HAM+BCN núcleo, CO2Wounds-V2 trabajo futuro.',
  7: 'TRL 4 como objetivo, TRL 5 como stretch. Cuatro entregables. Riesgos: R1 y R2 son los críticos.',
  8: 'Agradecer brevemente al director y a Karen. "Quedo atento a sus preguntas."',
};

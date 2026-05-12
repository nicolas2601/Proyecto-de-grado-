import { useEffect, useState, useRef } from 'react';
import { TOTAL_SECONDS, slideTimings } from '@/data/eda';
import { cn } from '@/lib/utils';
import SpotlightCursor from '@/components/reactbits/SpotlightCursor';
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

  // Lenis smooth scroll — mount/unmount lifecycle
  useEffect(() => {
    getLenis();
    return () => destroyLenis();
  }, []);

  // Scroll-driven slide tracking
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

  // Keyboard navigation
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

  // Timer
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
  const progress = (elapsed / TOTAL_SECONDS) * 100;
  const overdue = elapsed > cumulativeTarget;

  return (
    <>
      {/* Global motion layer — cursor spotlight + blob + click sparks + scroll progress */}
      <SpotlightCursor color="rgba(186, 80, 49, 0.18)" size={480} />
      <BlobCursor />
      <ClickSpark sparkColor="#ba5031" sparkCount={12} sparkRadius={22} duration={520} />
      <SlideProgress />

      {/* Timer overlay marker (kept only as visual ref for cumulative-target) */}
      <div className="no-print fixed top-[3px] left-0 right-0 z-50 h-[2px] pointer-events-none">
        <div
          className="absolute top-0 h-full w-px bg-terracotta"
          style={{ left: `${(cumulativeTarget / TOTAL_SECONDS) * 100}%` }}
        />
      </div>

      {/* Top-right control cluster */}
      <div className="no-print fixed top-5 right-5 z-50 flex items-center gap-2">
        <div className="glass rounded-full px-4 py-1.5 text-xs font-medium text-muted-stone flex items-center gap-3 shadow-sm">
          <span>
            <span className="font-display italic text-ink text-base">{current + 1}</span>
            <span className="text-light-steel"> / {slideTimings.length}</span>
          </span>
          <span className="h-3 w-px bg-light-steel/30" />
          <button
            type="button"
            onClick={() => {
              setRunning((v) => {
                if (!v) startRef.current = Date.now() - elapsed * 1000;
                return !v;
              });
            }}
            className={cn(
              'font-mono tabular-nums',
              overdue ? 'text-risk-high' : 'text-ink',
              running && 'animate-pulse'
            )}
            title="Toggle timer (T)"
          >
            {formatTime(elapsed)}
          </button>
          <span className="text-light-steel">/ {formatTime(TOTAL_SECONDS)}</span>
        </div>
        <button
          type="button"
          onClick={() => setShowNotes((v) => !v)}
          className={cn(
            'glass rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium transition-all shadow-sm hover:scale-105',
            showNotes && 'bg-warm-mist text-terracotta'
          )}
          title="Toggle presenter notes (N)"
        >
          N
        </button>
      </div>

      {/* Slide name (bottom-left) */}
      <div className="no-print fixed bottom-5 left-5 z-40 text-xs text-light-steel font-medium pointer-events-none">
        <span className="eyebrow text-light-steel">{slideMeta?.name}</span>
      </div>

      {/* Slide thumbnails (bottom-right) */}
      <nav className="no-print fixed bottom-5 right-5 z-40 flex gap-1.5 glass rounded-full px-3 py-2 shadow-sm">
        {slideTimings.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToSlide(s.id)}
            className={cn(
              'h-1.5 rounded-full transition-all',
              current === s.id ? 'w-8 bg-ink' : 'w-3 bg-ink/20 hover:bg-ink/40'
            )}
            title={s.name}
          />
        ))}
      </nav>

      {/* Presenter notes overlay */}
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
            className="slide"
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
    <div className="no-print fixed bottom-16 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[92vw] card bg-ink text-canvas/90">
      <div className="flex items-center justify-between mb-3">
        <span className="eyebrow text-canvas/40">Notas · slide {slideIdx + 1}</span>
        <span
          className={cn(
            'text-xs font-mono',
            onTrack ? 'text-chart-3' : delta > 0 ? 'text-risk-medium' : 'text-light-steel'
          )}
        >
          {delta > 0 ? `+${delta}s atrasado` : delta < 0 ? `${delta}s margen` : 'en tiempo'}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-canvas/85">{notes}</p>
      <p className="mt-3 text-[10px] text-canvas/40 font-mono">
        ← / → navegar · espacio avanzar · 6 saltar a EDA · T timer · R reset · N notas
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

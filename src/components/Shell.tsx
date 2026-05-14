import { useEffect } from 'react';
import { bootMotion, teardownMotion, mountCursor, pageReveal } from '@/lib/motion';
import Section00Inicio from '@/components/sections/Section00Inicio';
import Section01Introduccion from '@/components/sections/Section01Introduccion';
import Section02Problema from '@/components/sections/Section02Problema';
import Section03Pregunta from '@/components/sections/Section03Pregunta';
import Section04Justificacion from '@/components/sections/Section04Justificacion';
import Section05Objetivos from '@/components/sections/Section05Objetivos';
import Section06MarcoReferencia from '@/components/sections/Section06MarcoReferencia';
import Section07EstadoArte from '@/components/sections/Section07EstadoArte';
import Section08Metodologia from '@/components/sections/Section08Metodologia';
import Section09Avances from '@/components/sections/Section09Avances';
import Section10Referencias from '@/components/sections/Section10Referencias';
import Section11Gracias from '@/components/sections/Section11Gracias';

export default function Shell() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
    bootMotion();
    pageReveal();
    const offCursor = mountCursor();
    return () => {
      offCursor();
      teardownMotion();
    };
  }, []);

  return (
    <main className="relative">
      <Section00Inicio />
      <Section01Introduccion />
      <Section02Problema />
      <Section03Pregunta />
      <Section04Justificacion />
      <Section05Objetivos />
      <Section06MarcoReferencia />
      <Section07EstadoArte />
      <Section08Metodologia />
      <Section09Avances />
      <Section10Referencias />
      <Section11Gracias />
    </main>
  );
}

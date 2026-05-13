import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────
// § EQUIPO · Vanguard Cinematic Redesign
// Estructura: 3 Cards Individuales arriba (UNAB) + 1 Banner Full-Width (KAUST)
// Estética: Dark Ethereal Glass, tipografía masiva, proporciones armónicas.
// ─────────────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay },
});

const unabTeam = [
  {
    role: 'Autora',
    name: 'María Paula Saavedra',
    detail: 'Ingeniería de Sistemas',
    index: '01',
  },
  {
    role: 'Autor',
    name: 'Nicolás Moreno Monroy',
    detail: 'Ingeniería de Sistemas',
    index: '02',
  },
  {
    role: 'Director',
    name: 'Andrés Jerez Ariza',
    detail: 'Facultad de Ingeniería',
    index: '03',
  },
];

export default function SectionEquipo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="equipo"
      className="relative overflow-hidden"
      // Fondo ultra oscuro para contraste premium
      style={{ backgroundColor: '#061A2C', padding: 'clamp(100px, 12vw, 180px) 0' }}
    >
      {/* Luces volumétricas en el fondo para profundidad */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 left-[20%] w-[50vw] aspect-square rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(31,140,136,0.15) 0%, transparent 70%)', filter: 'blur(120px)' }}
        />
        <div 
          className="absolute bottom-0 right-[-10%] w-[60vw] aspect-square rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(0,108,53,0.15) 0%, transparent 70%)', filter: 'blur(140px)' }}
        />
      </div>

      <div className="container relative z-10 px-6 lg:px-12 mx-auto max-w-7xl">
        
        {/* Cabecera Editorial */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div {...fadeUp(0)} className="flex items-center gap-4 mb-8">
             <span className="w-12 h-[1px] bg-white/20" />
             <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/50">El Equipo</span>
             <span className="w-12 h-[1px] bg-white/20" />
          </motion.div>

          <motion.h2
            {...fadeUp(0.1)}
            style={{
              fontFamily: 'var(--font-serif), "Instrument Serif", serif',
              fontSize: 'clamp(48px, 8vw, 100px)',
              lineHeight: 0.9,
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            Cuatro mentes. <br />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Un propósito global.</span>
          </motion.h2>
        </div>

        {/* Grid de 3 Columnas para la UNAB */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {unabTeam.map((person, i) => (
            <TeamCard key={person.index} person={person} index={i} reduced={!!reduced} />
          ))}
        </div>

        {/* Banner Epic Full-Width para KAUST */}
        <KaustBanner reduced={!!reduced} />

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Tarjetas Individuales UNAB
// ─────────────────────────────────────────────────────────────────────────

function TeamCard({ person, index, reduced }: { person: typeof unabTeam[0], index: number, reduced: boolean }) {
  return (
    <motion.div
      {...fadeUp(0.2 + index * 0.1)}
      whileHover={reduced ? undefined : { y: -8, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden"
      style={{
        aspectRatio: '1 / 1.1',
        padding: '2.5rem',
        borderRadius: '2rem',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 20px 40px -20px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Gran número de fondo */}
      <div 
        className="absolute top-4 right-6 font-mono text-white opacity-5 transition-opacity duration-500 group-hover:opacity-10 pointer-events-none"
        style={{ fontSize: '120px', lineHeight: 0.8, letterSpacing: '-0.05em' }}
      >
        {person.index}
      </div>

      <div className="relative z-10">
        <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full border border-teal-soft/20 bg-teal-soft/5 mb-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-teal-soft">{person.role}</span>
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl lg:text-3xl font-medium tracking-tight text-white mb-2 leading-tight">
          {person.name.split(' ').map((n, i) => (
            <span key={i} className="block">{n}</span>
          ))}
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-4">
          UNAB · {person.detail}
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Banner KAUST · Fusión de Cristal y Bandera Saudí Inmersiva
// ─────────────────────────────────────────────────────────────────────────

function KaustBanner({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      {...fadeUp(0.5)}
      whileHover={reduced ? undefined : { scale: 1.01 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden group w-full flex flex-col md:flex-row"
      style={{
        borderRadius: '2rem',
        background: '#082035', // Ligeramente distinto al fondo para destacar
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)',
      }}
    >
      {/* El fondo del lado derecho se funde en Verde Saudí */}
      <div 
        className="absolute inset-y-0 right-0 w-full md:w-3/5 opacity-80 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,108,53,0.9) 50%, #006C35 100%)',
        }}
      />

      {/* Info Asesora (Izquierda) */}
      <div className="relative z-10 p-10 lg:p-14 flex flex-col justify-center w-full md:w-1/2">
        <div className="flex items-center gap-3 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-soft opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-soft"></span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal-soft/80">
              Asesoría Internacional
            </span>
        </div>

        <h3 className="text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1] mb-4">
          Karen Yaneth<br />Sánchez Quiroga
        </h3>
        
        <div className="w-12 h-[1px] bg-white/20 my-6" />

        <p className="text-white/60 text-sm leading-relaxed max-w-sm">
          King Abdullah University of Science and Technology (KAUST).<br />
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-3 block">
            Thuwal, Arabia Saudita
          </span>
        </p>
      </div>

      {/* Arte de la Bandera Saudí (Derecha) */}
      <div className="relative z-10 p-10 lg:p-14 flex items-center justify-center md:justify-end overflow-hidden min-h-[250px] w-full md:w-1/2 pointer-events-none">
          {/* Caligrafía Árabe (Shahada) y Espada integradas como textura inmersiva */}
          <div className="relative w-full max-w-[400px] flex flex-col items-end opacity-90 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:-translate-x-2">
            
            <div
              dir="rtl"
              style={{
                fontFamily: "'Noto Sans Arabic', 'Amiri', 'Arabic Typesetting', serif",
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.2,
                textAlign: 'right',
                letterSpacing: '0.01em',
              }}
            >
              لَا إِلَٰهَ إِلَّا اللَّٰهُ مُحَمَّدٌ رَسُولُ اللَّٰهِ
            </div>

            {/* Espada SVG Elegante */}
            <svg
              viewBox="0 0 300 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[85%] mt-6 opacity-90"
            >
              <path d="M10 15L250 13C265 13 275 14 280 15C275 16 265 17 250 17L10 15Z" fill="white"/>
              <path d="M10 15L2 15L10 13.5V16.5L10 15Z" fill="white"/>
              <rect x="250" y="9" width="3" height="12" rx="1.5" fill="white"/>
              <rect x="258" y="12" width="25" height="6" rx="3" fill="white"/>
              <circle cx="288" cy="15" r="4" fill="white"/>
            </svg>
          </div>
      </div>

    </motion.div>
  );
}

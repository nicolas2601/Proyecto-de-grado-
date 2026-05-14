// ─────────────────────────────────────────────────────────────────────────
// ProblemTreeD3 · "Editorial Print" — periódico tipo NYT/Atlantic.
//
// Sin cards. Sólo tipografía editorial:
// · Hero center: problema central como deck statement gigante.
// · Causas (izquierda) y consecuencias (derecha): columnas editoriales con
//   numeral grande "01-04", titular ítem corto + drop-cap, descripción.
// · Capas raíz/indirecta como pie nota inline.
// · Hover encadena. Click despliega cita.
// ─────────────────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ARBOL_TREE } from '@/data/content';
import { getCitations } from '@/data/citations';

const ENTER = [0.22, 1, 0.36, 1] as const;

function norm(t: any): { label: string; refs?: readonly string[] } {
  return typeof t === 'string' ? { label: t } : { label: t.label, refs: t.refs };
}

const causasInd = (ARBOL_TREE.causasIndirectas as any[]).map(norm);
const causasDir = (ARBOL_TREE.causasDirectas as any[]).map(norm);
const conseDir = (ARBOL_TREE.consecuenciasDirectas as any[]).map(norm);
const conseInd = (ARBOL_TREE.consecuenciasIndirectas as any[]).map(norm);

type ItemId =
  | `ci:${number}`
  | `cd:${number}`
  | `kd:${number}`
  | `ki:${number}`
  | 'core';

function firstWord(s: string): { head: string; tail: string } {
  const trimmed = s.trim();
  const space = trimmed.indexOf(' ');
  if (space === -1) return { head: trimmed, tail: '' };
  return { head: trimmed.slice(0, space + 1), tail: trimmed.slice(space + 1) };
}

export default function ProblemTreeD3() {
  const reduced = useReducedMotion();
  const [hoverId, setHoverId] = useState<ItemId | null>(null);
  const [selectedId, setSelectedId] = useState<ItemId | null>(null);
  const activeId = hoverId ?? selectedId;

  const inChain = (id: ItemId) => {
    if (!activeId) return false;
    if (activeId === 'core') return id === 'core';
    const [k, n] = activeId.split(':');
    if (k === 'ci' || k === 'cd') return id === `ci:${n}` || id === `cd:${n}` || id === 'core';
    if (k === 'kd' || k === 'ki') return id === `kd:${n}` || id === `ki:${n}` || id === 'core';
    return id === activeId;
  };

  const detail = useMemo(() => {
    if (!selectedId) return null;
    if (selectedId === 'core') return { label: ARBOL_TREE.problemaCentral, cites: [] as ReturnType<typeof getCitations> };
    const [k, n] = selectedId.split(':');
    const map = { ci: causasInd, cd: causasDir, kd: conseDir, ki: conseInd } as const;
    const item = (map as any)[k]?.[Number(n)];
    if (!item) return null;
    return { label: item.label, cites: item.refs ? getCitations([...item.refs]) : [] };
  }, [selectedId]);

  return (
    <div
      onClick={() => setSelectedId(null)}
      style={{
        position: 'relative',
        width: '100%',
        background: '#f7f5ee',
        border: '1px solid #d8d3c5',
        borderRadius: 12,
        overflow: 'hidden',
        padding: 'clamp(28px, 4vw, 56px)',
      }}
    >
      {/* Masthead */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 28,
          paddingBottom: 16,
          borderBottom: '2px solid #0a0b0c',
        }}
      >
        <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.32em', fontWeight: 700, color: '#0a0b0c' }}>
          UNAB · Sustentación 2026
        </div>
        <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.32em', fontWeight: 500, color: '#0a0b0c', opacity: 0.6 }}>
          Vol. 02 · Planteamiento
        </div>
      </div>

      {/* Three-column editorial layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 0.95fr) minmax(0, 1fr)',
          gap: 'clamp(20px, 3vw, 48px)',
          alignItems: 'stretch',
        }}
      >
        {/* LEFT COLUMN · CAUSAS */}
        <div>
          <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.32em', color: '#3d7dd6', fontWeight: 700, marginBottom: 18 }}>
            Causas · origen
          </div>
          {causasDir.map((c, i) => {
            const root = causasInd[i];
            const idDir = `cd:${i}` as ItemId;
            const idRoot = `ci:${i}` as ItemId;
            const active = inChain(idDir) || inChain(idRoot);
            const dim = activeId !== null && !active;
            const { head, tail } = firstWord(c.label);
            return (
              <motion.article
                key={idDir}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: dim ? 0.25 : 1, y: 0 }}
                animate={{ opacity: dim ? 0.25 : 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: ENTER, delay: 0.1 + i * 0.08 }}
                onMouseEnter={() => setHoverId(idDir)}
                onMouseLeave={() => setHoverId(null)}
                onClick={(e) => { e.stopPropagation(); setSelectedId(idDir); }}
                style={{
                  cursor: 'pointer',
                  marginBottom: 24,
                  paddingBottom: 24,
                  borderBottom: i < causasDir.length - 1 ? '1px solid #d8d3c5' : 'none',
                }}
              >
                <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
                  <div
                    className="font-mono"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 'clamp(28px, 3vw, 38px)',
                      fontWeight: 200,
                      color: active ? '#3d7dd6' : '#0a0b0c',
                      lineHeight: 0.9,
                      letterSpacing: '-0.04em',
                      transition: 'color 220ms',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 'clamp(15px, 1.35vw, 17px)',
                      lineHeight: 1.32,
                      letterSpacing: '-0.012em',
                      color: '#0a0b0c',
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{head}</span>
                    {tail}
                  </h4>
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12.5,
                    lineHeight: 1.55,
                    color: 'rgba(10,11,12,0.65)',
                    margin: '8px 0 0 0',
                    paddingLeft: 56,
                  }}
                >
                  <span className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: '0.22em', color: '#7ba8e6', fontWeight: 700, marginRight: 8 }}>
                    Raíz·
                  </span>
                  {root.label}
                </p>
              </motion.article>
            );
          })}
        </div>

        {/* CENTER · HERO STATEMENT */}
        <div
          onMouseEnter={() => setHoverId('core')}
          onMouseLeave={() => setHoverId(null)}
          onClick={(e) => { e.stopPropagation(); setSelectedId('core'); }}
          style={{
            position: 'relative',
            cursor: 'pointer',
            paddingTop: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {/* Top rule */}
          <div style={{ width: 60, height: 3, background: '#00543d', marginBottom: 18 }} />

          <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.32em', color: '#00543d', fontWeight: 700, marginBottom: 14 }}>
            Problema central
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: ENTER, delay: 0.3 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(22px, 2.6vw, 32px)',
              lineHeight: 1.18,
              letterSpacing: '-0.025em',
              fontWeight: 400,
              color: '#0a0b0c',
              margin: 0,
            }}
          >
            {ARBOL_TREE.problemaCentral}
          </motion.h2>

          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #d8d3c5' }}>
            <div> </div>
          </div>

          {/* Bottom rule */}
          <div style={{ width: 60, height: 3, background: '#00543d', marginTop: 24, marginLeft: 'auto' }} />
        </div>

        {/* RIGHT COLUMN · CONSECUENCIAS */}
        <div>
          <div
            className="font-mono uppercase"
            style={{
              fontSize: 10,
              letterSpacing: '0.32em',
              color: '#bf6db8',
              fontWeight: 700,
              marginBottom: 18,
              textAlign: 'right',
            }}
          >
            Consecuencias · impacto
          </div>
          {conseDir.map((c, i) => {
            const indirect = conseInd[i];
            const idDir = `kd:${i}` as ItemId;
            const idInd = `ki:${i}` as ItemId;
            const active = inChain(idDir) || inChain(idInd);
            const dim = activeId !== null && !active;
            const { head, tail } = firstWord(c.label);
            return (
              <motion.article
                key={idDir}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: dim ? 0.25 : 1, y: 0 }}
                animate={{ opacity: dim ? 0.25 : 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: ENTER, delay: 0.3 + i * 0.08 }}
                onMouseEnter={() => setHoverId(idDir)}
                onMouseLeave={() => setHoverId(null)}
                onClick={(e) => { e.stopPropagation(); setSelectedId(idDir); }}
                style={{
                  cursor: 'pointer',
                  marginBottom: 24,
                  paddingBottom: 24,
                  borderBottom: i < conseDir.length - 1 ? '1px solid #d8d3c5' : 'none',
                  textAlign: 'right',
                }}
              >
                <div style={{ display: 'flex', gap: 14, alignItems: 'baseline', justifyContent: 'flex-end' }}>
                  <h4
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 'clamp(15px, 1.35vw, 17px)',
                      lineHeight: 1.32,
                      letterSpacing: '-0.012em',
                      color: '#0a0b0c',
                      fontWeight: 500,
                      margin: 0,
                      textAlign: 'right',
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{head}</span>
                    {tail}
                  </h4>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 'clamp(28px, 3vw, 38px)',
                      fontWeight: 200,
                      color: active ? '#bf6db8' : '#0a0b0c',
                      lineHeight: 0.9,
                      letterSpacing: '-0.04em',
                      transition: 'color 220ms',
                    }}
                  >
                    {String(i + 5).padStart(2, '0')}
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12.5,
                    lineHeight: 1.55,
                    color: 'rgba(10,11,12,0.65)',
                    margin: '8px 0 0 0',
                    paddingRight: 56,
                  }}
                >
                  {indirect.label}
                  <span
                    className="font-mono uppercase"
                    style={{
                      fontSize: 9,
                      letterSpacing: '0.22em',
                      color: '#d491cd',
                      fontWeight: 700,
                      marginLeft: 8,
                    }}
                  >
                    ·sistémica
                  </span>
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Footer rule + meta */}
      <div
        style={{
          marginTop: 32,
          paddingTop: 14,
          borderTop: '1px solid #d8d3c5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(10,11,12,0.55)',
          fontWeight: 500,
        }}
      >
        <span>Lesiones cutáneas · Santander · 2026</span>
        <span>{reduced ? 'reduced motion' : 'hover encadena · click despliega fuente'}</span>
      </div>

      {detail && (
        <div
          style={{
            position: 'absolute',
            right: 24,
            bottom: 24,
            maxWidth: 380,
            background: '#ffffff',
            border: '1px solid #0a0b0c',
            borderRadius: 0,
            padding: '16px 18px',
            boxShadow: '0 18px 38px -16px rgba(10,11,12,0.18)',
            zIndex: 10,
          }}
        >
          <div
            className="font-mono uppercase"
            style={{ fontSize: 9.5, letterSpacing: '0.22em', color: '#00543d', fontWeight: 700, marginBottom: 8 }}
          >
            {detail.cites.length > 0 ? `Fuente · ${detail.cites.length}` : 'Detalle'}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: '#0a0b0c',
              marginBottom: detail.cites.length > 0 ? 10 : 0,
              paddingBottom: detail.cites.length > 0 ? 10 : 0,
              borderBottom: detail.cites.length > 0 ? '1px solid #d8d3c5' : 'none',
            }}
          >
            {detail.label}
          </div>
          {detail.cites.map((c) => (
            <div key={c.id} style={{ marginBottom: 8 }}>
              <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.06em', color: '#00543d', fontWeight: 600 }}>
                {c.short}
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.45, color: '#0a0b0c', opacity: 0.75 }}>
                {c.full}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

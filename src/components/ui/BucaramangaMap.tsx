// ─────────────────────────────────────────────────────────────────────────
// Mapa interactivo de Bucaramanga · Leaflet con tiles CartoDB monocromáticos
// + marker en el AMB + círculo de cobertura. Pan/zoom habilitado.
// Sin SSR: el mapa se monta solo en cliente.
// ─────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';

const BUCARAMANGA: [number, number] = [7.1254, -73.1198];
const AMB_RADIUS_M = 14000; // ~14 km radio (cubre Bucaramanga, Floridablanca, Girón, Piedecuesta)

const AMB_BOUNDS: [number, number][] = [
  // Polígono aproximado del área metropolitana
  [7.2065, -73.1715], // norte
  [7.1908, -73.0773],
  [7.1218, -73.0388],
  [7.0382, -73.0480], // sur Piedecuesta
  [7.0245, -73.1010],
  [7.0584, -73.1660],
  [7.0964, -73.1958], // oeste Girón
  [7.1668, -73.1965],
];

export default function BucaramangaMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof window === 'undefined') return;

    let map: any;
    let cleaned = false;

    (async () => {
      try {
        const L = await import('leaflet');
        await import('leaflet/dist/leaflet.css');
        if (cleaned || !ref.current) return;

        map = L.map(ref.current, {
          center: BUCARAMANGA,
          zoom: 11,
          scrollWheelZoom: false,
          attributionControl: true,
          zoomControl: true,
        });

        // Tiles CartoDB Positron (gris suave, minimalista, encaja con paleta paper)
        L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> · &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
          }
        ).addTo(map);

        // Label layer encima · solo labels sin colores
        L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
          { subdomains: 'abcd', maxZoom: 19, pane: 'overlayPane' }
        ).addTo(map);

        // Polígono AMB · teal translúcido
        L.polygon(AMB_BOUNDS, {
          color: '#1F8C88',
          weight: 1.4,
          fillColor: '#1F8C88',
          fillOpacity: 0.10,
          dashArray: '6 4',
        })
          .addTo(map)
          .bindTooltip(
            '<strong>Área Metropolitana de Bucaramanga</strong><br/>Bucaramanga · Floridablanca · Girón · Piedecuesta',
            { sticky: true, direction: 'top' }
          );

        // Círculo de radio aproximado
        L.circle(BUCARAMANGA, {
          radius: AMB_RADIUS_M,
          color: '#1F8C88',
          fillColor: '#1F8C88',
          fillOpacity: 0.03,
          weight: 0.8,
          dashArray: '2 6',
        }).addTo(map);

        // Marker custom HIC + Bucaramanga
        const icon = L.divIcon({
          className: 'amb-marker',
          html: `
            <div style="position:relative;">
              <span style="position:absolute;inset:-12px;border-radius:50%;background:rgba(242,107,58,0.35);animation:ambPulse 2.2s ease-out infinite;"></span>
              <span style="position:relative;display:block;width:14px;height:14px;border-radius:50%;background:#F26B3A;border:2px solid #fff;box-shadow:0 0 0 1px rgba(15,44,69,0.25);"></span>
            </div>
            <style>
              @keyframes ambPulse {
                0% { transform: scale(0.6); opacity: 0.6; }
                100% { transform: scale(2.4); opacity: 0; }
              }
            </style>
          `,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        L.marker(BUCARAMANGA, { icon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:Inter,sans-serif;font-size:13px;line-height:1.4;">
              <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#1F8C88;margin-bottom:4px;">
                Hospital Internacional
              </div>
              <div style="font-weight:600;color:#0F2C45;font-size:14px;">Bucaramanga · HIC</div>
              <div style="color:#4D5B6D;font-size:12px;margin-top:4px;">
                3,060 casos registrados<br/>2016–2023 · 64.82% BCC
              </div>
            </div>`,
            { closeButton: false }
          );

        setReady(true);
      } catch (e: any) {
        setError(e?.message ?? 'No se pudo cargar el mapa');
      }
    })();

    return () => {
      cleaned = true;
      if (map) map.remove();
    };
  }, []);

  return (
    <div className="relative w-full">
      <div
        ref={ref}
        style={{
          width: '100%',
          height: 'clamp(360px, 48vh, 520px)',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid var(--color-line)',
          background: '#EEF2F2',
          opacity: ready ? 1 : 0.6,
          transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
      {!ready && !error && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-graphite)',
          }}
        >
          Cargando mapa…
        </div>
      )}
      {error && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            color: 'var(--color-orange)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
          }}
        >
          {error}
        </div>
      )}
      {/* Overlay leyenda */}
      <div
        style={{
          position: 'absolute',
          left: 12,
          bottom: 12,
          background: 'rgba(255,255,255,0.96)',
          border: '1px solid var(--color-line)',
          borderRadius: 10,
          padding: '10px 14px',
          fontFamily: 'Inter, sans-serif',
          fontSize: 12,
          color: 'var(--color-charcoal)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 400,
          pointerEvents: 'none',
        }}
      >
        <div
          className="font-mono uppercase"
          style={{
            fontSize: 9,
            letterSpacing: '0.18em',
            color: 'var(--color-graphite)',
            marginBottom: 6,
          }}
        >
          Leyenda
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#F26B3A',
              border: '2px solid #fff',
              boxShadow: '0 0 0 1px rgba(15,44,69,0.25)',
              flexShrink: 0,
            }}
          />
          <span>Bucaramanga · HIC</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 16,
              height: 10,
              background: 'rgba(31,140,136,0.18)',
              border: '1.4px dashed #1F8C88',
              flexShrink: 0,
            }}
          />
          <span>AMB · 4 municipios</span>
        </div>
      </div>
    </div>
  );
}

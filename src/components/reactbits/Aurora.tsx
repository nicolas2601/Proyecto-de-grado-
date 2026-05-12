import { useEffect, useRef } from 'react';

/**
 * Aurora — fondo WebGL con bandas de luz que ondulan.
 * Shader inspirado en reactbits.dev/Aurora — adaptado a paleta terracotta/canvas.
 */
const VERT = /* glsl */ `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform float u_amplitude;
  uniform float u_blend;

  // noise helpers
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;
    i=mod289(i);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m;m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0;
    vec3 h=abs(x)-0.5;
    vec3 ox=floor(x+0.5);
    vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv;
    p.x *= aspect;

    float t = u_time * 0.18;
    float n1 = snoise(vec2(p.x * 1.2, p.y * 1.6 + t)) * 0.5 + 0.5;
    float n2 = snoise(vec2(p.x * 2.0 - t * 0.7, p.y * 0.9 + t * 0.4)) * 0.5 + 0.5;
    float n3 = snoise(vec2(p.x * 0.8 + t * 0.3, p.y * 1.3 - t * 0.2)) * 0.5 + 0.5;

    float bandY = 0.45 + sin(p.x * 2.2 + t) * 0.18 * u_amplitude
                       + sin(p.x * 4.7 + t * 1.3) * 0.06 * u_amplitude;
    float dist = abs(p.y - bandY);
    float band = smoothstep(0.32, 0.0, dist);

    vec3 col = mix(u_color1, u_color2, n1);
    col = mix(col, u_color3, n2 * 0.6);
    col = mix(vec3(0.97, 0.95, 0.92), col, band * u_blend);

    // soft canvas-tint base
    col = mix(vec3(0.984, 0.961, 0.937), col, 0.55 + n3 * 0.25);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function hexToVec3(hex: string): [number, number, number] {
  const m = hex.replace('#', '').match(/.{1,2}/g)!;
  return [parseInt(m[0], 16) / 255, parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255];
}

export default function Aurora({
  colorStops = ['#fbe1d1', '#ba5031', '#5d2a1a'],
  amplitude = 0.9,
  blend = 0.55,
  className = '',
}: {
  colorStops?: [string, string, string];
  amplitude?: number;
  blend?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: true, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (src: string, type: number) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const vs = compile(VERT, gl.VERTEX_SHADER);
    const fs = compile(FRAG, gl.FRAGMENT_SHADER);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uC1 = gl.getUniformLocation(prog, 'u_color1');
    const uC2 = gl.getUniformLocation(prog, 'u_color2');
    const uC3 = gl.getUniformLocation(prog, 'u_color3');
    const uAmp = gl.getUniformLocation(prog, 'u_amplitude');
    const uBlend = gl.getUniformLocation(prog, 'u_blend');

    gl.uniform3fv(uC1, hexToVec3(colorStops[0]));
    gl.uniform3fv(uC2, hexToVec3(colorStops[1]));
    gl.uniform3fv(uC3, hexToVec3(colorStops[2]));
    gl.uniform1f(uAmp, amplitude);
    gl.uniform1f(uBlend, blend);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    const start = performance.now();
    const tick = () => {
      resize();
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [colorStops, amplitude, blend]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}

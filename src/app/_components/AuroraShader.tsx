"use client";

import { useEffect, useRef } from "react";

/**
 * AuroraShader — a lightweight WebGL fragment shader that draws three
 * slowly-drifting green metaballs against a transparent background.
 *
 * Sits under the hero content. The canvas renders at half device-pixel
 * resolution (the shader is intentionally blurry, so the upscale is
 * invisible) which keeps GPU cost negligible.
 *
 * Pauses on prefers-reduced-motion or when the hero leaves the viewport.
 * Falls back gracefully: if WebGL is unavailable the canvas stays
 * transparent and the parent's static gradient still reads.
 */
export function AuroraShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      premultipliedAlpha: true,
      alpha: true,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    // Enable proper alpha blending. Source-over composition so transparent
    // pixels in the canvas truly let the dark hero base show through.
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    /* ── Shaders ───────────────────────────────────────────── */
    const VERT = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    const FRAG = `
      precision highp float;
      uniform vec2 u_res;
      uniform float u_t;

      // Smooth value noise (2D)
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }
      mat2 rot(float a) {
        float c = cos(a), s = sin(a);
        return mat2(c, -s, s, c);
      }
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.55;
        for (int i = 0; i < 3; i++) {
          v += a * noise(p);
          p = rot(0.5) * p * 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_res;
        float aspect = u_res.x / u_res.y;
        vec2 p = vec2(uv.x * aspect, uv.y);

        // Very slow time
        float t = u_t * 0.00008;

        // Warp the coordinate space with fBm — gives the ribbon its
        // organic, flowing-aurora curl rather than a flat sine wave.
        vec2 warp = vec2(
          fbm(p * 2.0 + vec2(t * 0.8, t * 0.5)),
          fbm(p * 2.0 + vec2(7.4 - t * 0.6, 3.1 + t * 0.7))
        );
        p += (warp - 0.5) * 0.55;

        // In WebGL gl_FragCoord.y is 0 at the bottom of the framebuffer
        // and the framebuffer is presented flipped to screen — so
        // uv.y near 0 maps to the visual BOTTOM of the hero, near 1
        // to the visual TOP.

        // Wave ribbon centered in the visual lower portion of the hero
        // (uv.y around 0.18). Center drifts slowly with time.
        float center = 0.18
          + sin(p.x * 0.9 + t * 1.4) * 0.10
          + cos(p.x * 0.4 + t * 0.8 + 1.7) * 0.05;
        float dist = abs(p.y - center);

        // Falloff for the ribbon thickness
        float field = 1.0 - smoothstep(0.0, 0.32, dist);
        field = pow(field, 1.45);

        // Mask out the top of the hero (high uv.y) — keep the headline
        // area completely clean. Smooth fade from fully transparent at
        // uv.y >= 0.55 to fully visible at uv.y <= 0.25.
        float bottomMask = 1.0 - smoothstep(0.25, 0.55, uv.y);
        field *= bottomMask;

        vec3 green = vec3(0.55, 0.90, 0.30);
        vec3 cooler = vec3(0.42, 0.80, 0.42);
        vec3 col = mix(cooler, green, field);

        // Premultiplied output: color is already multiplied by alpha so
        // the canvas compositor blends correctly without extra math.
        float a = field * 0.55;
        gl_FragColor = vec4(col * a, a);
      }
    `;

    function compile(type: number, src: string) {
      const sh = gl!.createShader(type)!;
      gl!.shaderSource(sh, src);
      gl!.compileShader(sh);
      if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS)) {
        // Compilation failed; fall back silently
        return null;
      }
      return sh;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // Fullscreen quad
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uT = gl.getUniformLocation(prog, "u_t");

    /* ── Sizing ────────────────────────────────────────────── */
    // Render at 0.5x CSS resolution; the shader is intentionally blurry
    // so the upscale is invisible and we keep GPU work cheap.
    const RES = 0.5;
    function resize() {
      const r = canvas!.getBoundingClientRect();
      const w = Math.max(1, Math.floor(r.width * RES));
      const h = Math.max(1, Math.floor(r.height * RES));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
      gl!.uniform2f(uRes, w, h);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── Animation loop ───────────────────────────────────── */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = !reduced;
    const start = performance.now();

    function frame(now: number) {
      if (!running) return;
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.uniform1f(uT, now - start);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
    }

    if (reduced) {
      // Draw a single static frame so the green wash is still there
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uT, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    } else {
      raf = requestAnimationFrame(frame);
    }

    // Pause when scrolled off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(frame);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={canvasRef} className="lp-aurora-canvas" aria-hidden="true" />;
}

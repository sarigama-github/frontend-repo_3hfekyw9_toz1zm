import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import Hero3D from './Hero3D'

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(!!m.matches)
    handler()
    m.addEventListener('change', handler)
    return () => m.removeEventListener('change', handler)
  }, [])
  return reduced
}

const useIsMobile = () => {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return mobile
}

const NeonButton = ({ children, href }) => {
  return (
    <a
      href={href}
      className="group relative inline-flex select-none items-center gap-2 overflow-hidden rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-white backdrop-blur transition hover:bg-white/20 active:scale-[0.98]"
      onTouchStart={(e) => {
        // Trigger hover-like state on touch
        e.currentTarget.classList.add('ring-1', 'ring-white/30')
      }}
      onTouchEnd={(e) => {
        e.currentTarget.classList.remove('ring-1', 'ring-white/30')
      }}
    >
      <span className="absolute inset-0 -z-0 bg-gradient-to-r from-fuchsia-500/40 via-cyan-500/40 to-blue-500/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  )
}

// Lightweight canvas particles for mobile
const CanvasParticles = ({ density = 24, color = 'rgba(168, 255, 255, 0.6)' }) => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const DPR = Math.min(2, window.devicePixelRatio || 1)
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.floor(width * DPR)
      canvas.height = Math.floor(height * DPR)
    }
    const initParticles = () => {
      const count = density
      particlesRef.current = new Array(count).fill(0).map(() => ({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0006,
        vy: (Math.random() - 0.5) * 0.0006,
        r: 1 + Math.random() * 1.5,
      }))
    }
    const step = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = color
      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > 1) p.vx *= -1
        if (p.y < 0 || p.y > 1) p.vy *= -1
        const px = p.x * w
        const py = p.y * h
        ctx.beginPath()
        ctx.arc(px, py, p.r * (w + h) * 0.0003, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(step)
    }

    resize()
    initParticles()
    step()

    const ro = new ResizeObserver(() => {
      resize()
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [density, color])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}

// Ultra-light rotating cube using CSS (for mobile). Faces show tech icons/text.
const RotatingCube = () => {
  return (
    <div className="relative mx-auto h-40 w-40 [perspective:800px]">
      <div className="absolute inset-0 m-auto h-full w-full [transform-style:preserve-3d] animate-[spin3d_12s_linear_infinite]">
        {[
          { t: '☕ Java', c: 'bg-rose-500/20 border-rose-300/30', r: 'rotateY(0deg) translateZ(80px)' },
          { t: '⚛️ React', c: 'bg-cyan-500/20 border-cyan-300/30', r: 'rotateY(90deg) translateZ(80px)' },
          { t: '🟢 Node', c: 'bg-green-500/20 border-green-300/30', r: 'rotateY(180deg) translateZ(80px)' },
          { t: '</> Code', c: 'bg-fuchsia-500/20 border-fuchsia-300/30', r: 'rotateY(-90deg) translateZ(80px)' },
          { t: 'UI', c: 'bg-blue-500/20 border-blue-300/30', r: 'rotateX(90deg) translateZ(80px)' },
          { t: 'API', c: 'bg-amber-500/20 border-amber-300/30', r: 'rotateX(-90deg) translateZ(80px)' },
        ].map((f, i) => (
          <div
            key={i}
            className={`absolute left-0 top-0 flex h-40 w-40 items-center justify-center rounded-xl border text-sm font-semibold text-white/90 shadow-inner ${f.c}`}
            style={{ transform: f.r }}
          />
        ))}
      </div>
      <style>{`
        @keyframes spin3d { from { transform: rotateX(0deg) rotateY(0deg); } to { transform: rotateX(360deg) rotateY(360deg); } }
      `}</style>
    </div>
  )
}

export default function Hero() {
  const controls = useAnimation()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotX = useTransform(mouseY, [0, 1], [6, -6])
  const rotY = useTransform(mouseX, [0, 1], [-6, 6])

  const containerRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const isMobile = useIsMobile()

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: reduced ? 0.3 : 0.8, ease: 'easeOut' } })
  }, [controls, reduced])

  const handleMouseMove = (e) => {
    if (isMobile || reduced) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }

  const headingMotion = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: controls,
    transition: { duration: reduced ? 0.3 : 0.8, ease: 'easeOut' },
  }), [controls, reduced])

  return (
    <section id="home" className="relative h-[90vh] w-full overflow-hidden rounded-b-[2rem] bg-gradient-to-b from-[#0B0F19] to-[#0B1222]">
      <div className="pointer-events-none absolute inset-0">{/* floating neon gradients */}
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[100px]" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]" />
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-8 px-6 md:flex-row"
      >
        {/* Copy */}
        <motion.div style={!isMobile && !reduced ? { rotateX: rotX, rotateY: rotY } : {}} {...headingMotion} className="relative z-10 max-w-xl text-center md:text-left">
          <motion.h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
            Hi, I'm <span className="bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">Sahil Ali</span>
          </motion.h1>
          <p className="mt-3 text-lg font-medium text-white/80 md:text-xl">UI/UX Enthusiast | Full Stack Java Developer</p>
          <p className="mt-5 text-white/70">I build exceptional digital experiences that make life simpler and more enjoyable.</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <NeonButton href="#projects">View Projects</NeonButton>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-cyan-500/20 px-5 py-3 text-cyan-200 ring-1 ring-cyan-400/30 backdrop-blur transition hover:bg-cyan-500/30 active:scale-[0.98]"
              onTouchStart={(e) => e.currentTarget.classList.add('bg-cyan-500/30')}
              onTouchEnd={(e) => e.currentTarget.classList.remove('bg-cyan-500/30')}
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>
          </div>
        </motion.div>

        {/* Visual: R3F 3D on desktop, ultra-light mobile visual */}
        <motion.div
          animate={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ delay: 0.1, duration: reduced ? 0.3 : 0.8, ease: 'easeOut' }}
          className="relative z-0 h-[280px] w-full max-w-2xl sm:h-[320px] md:h-[420px]"
        >
          <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
            {isMobile || reduced ? (
              <div className="relative flex h-full w-full items-center justify-center">
                <CanvasParticles density={18} />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(244,114,182,0.12),transparent_50%)]" />
                <RotatingCube />
              </div>
            ) : (
              <Hero3D className="h-full w-full" />
            )}
          </div>
          {/* light floating particles (CSS-only) */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-6 top-6 h-2 w-2 animate-ping rounded-full bg-cyan-300/70" />
            <div className="absolute right-10 top-10 h-2 w-2 animate-ping rounded-full bg-fuchsia-300/70" />
            <div className="absolute bottom-10 left-1/3 h-2 w-2 animate-ping rounded-full bg-blue-300/70" />
          </div>
        </motion.div>
      </div>

      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,0.04)_25%,rgba(255,255,255,0.04)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.04)_75%,rgba(255,255,255,0.04)_76%,transparent_77%),linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.04)_25%,rgba(255,255,255,0.04)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.04)_75%,rgba(255,255,255,0.04)_76%,transparent_77%)] bg-[size:44px_44px]" />
    </section>
  )
}

import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { ArrowRight, Mail } from 'lucide-react'

const NeonButton = ({ children, href }) => {
  return (
    <a href={href} className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-white backdrop-blur transition hover:bg-white/20">
      <span className="absolute inset-0 -z-0 bg-gradient-to-r from-fuchsia-500/40 via-cyan-500/40 to-blue-500/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  )
}

export default function Hero() {
  const controls = useAnimation()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotX = useTransform(mouseY, [0, 1], [6, -6])
  const rotY = useTransform(mouseX, [0, 1], [-6, 6])

  const containerRef = useRef(null)

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } })
  }, [controls])

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <section id="home" className="relative h-[90vh] w-full overflow-hidden rounded-b-[2rem] bg-gradient-to-b from-[#0B0F19] to-[#0B1222]">
      <div className="pointer-events-none absolute inset-0">{/* floating neon gradients */}
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[100px]" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]" />
      </div>

      <div ref={containerRef} onMouseMove={handleMouseMove} className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-10 px-6 md:flex-row">
        {/* Copy */}
        <motion.div style={{ rotateX: rotX, rotateY: rotY }} animate={controls} initial={{ opacity: 0, y: 20 }} className="relative z-10 max-w-xl text-center md:text-left">
          <motion.h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
            Hi, I'm <span className="bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">Sahil Ali</span>
          </motion.h1>
          <p className="mt-3 text-lg font-medium text-white/80 md:text-xl">UI/UX Enthusiast | Full Stack Java Developer</p>
          <p className="mt-5 text-white/70">I build exceptional digital experiences that make life simpler and more enjoyable.</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <NeonButton href="#projects">View Projects</NeonButton>
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-xl bg-cyan-500/20 px-5 py-3 text-cyan-200 ring-1 ring-cyan-400/30 backdrop-blur transition hover:bg-cyan-500/30">
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>
          </div>
        </motion.div>

        {/* 3D Spline Scene */}
        <motion.div animate={{ opacity: [0, 1], y: [20, 0] }} transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }} className="relative z-0 h-[320px] w-full max-w-2xl md:h-[420px]">
          <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
            <Spline scene="https://prod.spline.design/VyGeZv58yuk8j7Yy/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
          {/* floating particles */}
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

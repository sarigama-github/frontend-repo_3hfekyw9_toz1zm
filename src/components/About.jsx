import React from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function About() {
  return (
    <section id="about" className="relative mx-auto mt-24 max-w-7xl px-6">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: 'easeOut' }} className="relative">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Get to know me and my journey in the world of Java Development.</h2>
          <p className="mt-5 text-white/80 leading-relaxed">
            👋 Hello! I'm Sahil Ali, a passionate Full Stack Java Developer with expertise in React.js, Node.js, Java, C, and Python. I love crafting intuitive interfaces and building robust backend systems. My mission is to create seamless digital experiences that are fast, accessible, and delightful to use. I thrive on solving complex problems, learning new technologies, and collaborating with teams to deliver impactful products.
          </p>
          <p className="mt-4 text-white/70">
            When I'm not coding, you'll find me exploring UI trends, contributing to open source, and experimenting with creative 3D web interactions.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }} className="relative h-[320px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur md:h-[420px]">
          <Spline scene="https://prod.spline.design/VyGeZv58yuk8j7Yy/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </motion.div>
      </div>
    </section>
  )
}

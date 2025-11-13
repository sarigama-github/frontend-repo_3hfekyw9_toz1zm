import React from 'react'
import { motion } from 'framer-motion'

const facts = [
  { label: 'Fueled by 3 cups of coffee daily' },
  { label: '10,000+ lines of code written' },
  { label: 'Love solving complex problems' },
  { label: 'Passionate about open source' },
]

export default function FunFacts() {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-6">
      <h3 className="mb-6 text-center text-2xl font-bold text-white">Fun Facts</h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {facts.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ rotateX: 8, rotateY: -8, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-white backdrop-blur"
          >
            <div className="absolute inset-0 -z-0 bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <p className="relative z-10">{f.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

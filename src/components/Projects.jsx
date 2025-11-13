import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  { title: 'Portfolio Website for a Friend', type: 'Web' },
  { title: 'My Previous Portfolio', type: 'Web' },
  { title: 'SkillFirst Platform', type: 'Web' },
  { title: 'Weather App', type: 'Mobile' },
  { title: 'Expense Calculator', type: 'Web' },
  { title: 'Brain Buzzzz', type: 'Web' },
  { title: 'Math Game', type: 'Web' },
  { title: "Pet’s Zone", type: 'Web' },
]

const filters = ['All', 'Web', 'Mobile', 'Design']

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const items = filter === 'All' ? projects : projects.filter(p => p.type === filter)

  return (
    <section id="projects" className="mx-auto mt-24 max-w-7xl px-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-3xl font-bold text-white">Projects</h3>
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1.5 text-sm backdrop-blur transition ${filter===f? 'bg-white/20 text-white ring-1 ring-white/30': 'bg-white/10 text-white/80 hover:bg-white/15'}`}>{f}</button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence>
          {items.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur"
            >
              <div className="absolute inset-0 -z-0 bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="flex h-32 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
                <span className="text-sm text-white/70">{p.type}</span>
              </div>
              <div className="mt-4 font-semibold">{p.title}</div>
              <div className="mt-1 text-sm text-white/70">React • Node • Tailwind</div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

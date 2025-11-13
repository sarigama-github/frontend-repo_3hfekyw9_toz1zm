import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Award, Briefcase, FolderGit2, Users } from 'lucide-react'

const StatCard = ({ icon: Icon, value, label, delay }) => {
  const controls = useAnimation()
  useEffect(() => {
    controls.start({
      opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: 'easeOut' }
    })
  }, [controls, delay])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={controls} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white backdrop-blur">
      <div className="absolute inset-0 -z-0 bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <Icon className="mx-auto mb-3 h-8 w-8 text-cyan-300 transition-transform group-hover:scale-110" />
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="mt-1 text-white/70">{label}</div>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className="relative mx-auto -mt-16 max-w-7xl px-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={Briefcase} value="2+" label="Years Experience" delay={0.1} />
        <StatCard icon={FolderGit2} value="15+" label="Projects Completed" delay={0.2} />
        <StatCard icon={Users} value="5+" label="Happy Clients" delay={0.3} />
        <StatCard icon={Award} value="8+" label="Awards" delay={0.4} />
      </div>
    </section>
  )
}

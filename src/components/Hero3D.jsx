import React, { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, SoftShadows } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'

// Create a canvas-based texture with a label/icon-like text
function useLabelTexture(label, bg = '#0f172a', fg = '#a5f3fc') {
  return useMemo(() => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    // background
    const grad = ctx.createLinearGradient(0, 0, size, size)
    grad.addColorStop(0, bg)
    grad.addColorStop(1, '#0b1222')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
    // neon border
    ctx.strokeStyle = 'rgba(165,243,252,0.5)'
    ctx.lineWidth = 6
    ctx.strokeRect(8, 8, size - 16, size - 16)
    // text
    ctx.fillStyle = fg
    ctx.font = '600 64px Inter, system-ui, -apple-system, Segoe UI'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = fg
    ctx.shadowBlur = 12
    ctx.fillText(label, size / 2, size / 2)

    const tex = new THREE.CanvasTexture(canvas)
    tex.anisotropy = 4
    tex.needsUpdate = true
    return tex
  }, [label, bg, fg])
}

function RotatingTechCube(props) {
  const ref = useRef()
  const java = useLabelTexture('☕ Java', '#1b0b15', '#fca5a5')
  const react = useLabelTexture('⚛ React', '#06202a', '#67e8f9')
  const node = useLabelTexture('🟢 Node', '#0d1b12', '#86efac')
  const ui = useLabelTexture('UI', '#0b1022', '#93c5fd')
  const code = useLabelTexture('</>', '#1a1022', '#f0abfc')
  const api = useLabelTexture('API', '#22180b', '#fbbf24')

  const materials = useMemo(() => [java, react, node, ui, code, api].map((t) => new THREE.MeshStandardMaterial({ map: t, roughness: 0.6, metalness: 0.2 })), [java, react, node, ui, code, api])

  useFrame((state, delta) => {
    if (!ref.current) return
    // slow, smooth rotation
    ref.current.rotation.x += delta * 0.12
    ref.current.rotation.y += delta * 0.18
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08 + 1.0
  })

  return (
    <mesh ref={ref} {...props} material={materials} castShadow>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      {materials.map((m, i) => (
        <meshStandardMaterial key={i} attach={`material-${i}`} map={m.map} roughness={0.6} metalness={0.2} />
      ))}
    </mesh>
  )
}

function FloatingLaptop(props) {
  const group = useRef()
  const screenMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0ea5e9', emissive: '#38bdf8', emissiveIntensity: 1.2, roughness: 0.4 }), [])
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1f2937', metalness: 0.6, roughness: 0.4 }), [])
  const keyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0ea5e9', emissive: '#22d3ee', emissiveIntensity: 0.9, roughness: 0.7, transparent: true, opacity: 0.85 }), [])

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.x = Math.sin(t * 0.6) * 0.1 - 0.2
    group.current.rotation.y = Math.cos(t * 0.4) * 0.15
    group.current.position.y = Math.sin(t * 0.8) * 0.08 + 0.6
  })

  return (
    <group ref={group} {...props}>
      {/* Base */}
      <mesh material={bodyMat} castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 0.08, 1.1]} />
      </mesh>
      {/* Keyboard glow slab */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[1.5, 0.005, 1.0]} />
        <meshStandardMaterial color={'#0ea5e9'} emissive={'#38bdf8'} emissiveIntensity={1.0} transparent opacity={0.7} />
      </mesh>
      {/* Hinge */}
      <mesh material={bodyMat} castShadow position={[0, 0.3, -0.52]} rotation={[Math.PI * -0.04, 0, 0]}>
        <boxGeometry args={[1.6, 0.04, 0.08]} />
      </mesh>
      {/* Screen */}
      <mesh castShadow material={bodyMat} position={[0, 0.9, -0.55]} rotation={[Math.PI * -0.18, 0, 0]}>
        <boxGeometry args={[1.55, 1.0, 0.06]} />
      </mesh>
      {/* Screen glow */}
      <mesh castShadow position={[0, 0.9, -0.52]} rotation={[Math.PI * -0.18, 0, 0]}>
        <planeGeometry args={[1.5, 0.95]} />
        <meshStandardMaterial color={'#0ea5e9'} emissive={'#22d3ee'} emissiveIntensity={1.6} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

function FloatingCodeBlocks({ count = 6 }) {
  const group = useRef()
  const blocks = useMemo(() => new Array(count).fill(0).map((_, i) => ({
    pos: new THREE.Vector3((Math.random() - 0.5) * 4, 0.4 + Math.random() * 1.8, (Math.random() - 0.5) * 2),
    rot: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
    scale: 0.2 + Math.random() * 0.35,
    speed: 0.2 + Math.random() * 0.5,
  })), [count])
  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.children.forEach((mesh, i) => {
      const b = blocks[i]
      mesh.position.y = b.pos.y + Math.sin(t * b.speed + i) * 0.12
      mesh.rotation.x += delta * 0.15
      mesh.rotation.y -= delta * 0.1
    })
  })

  const codeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f472b6', roughness: 0.5, metalness: 0.2 }), [])

  return (
    <group ref={group}>
      {blocks.map((b, i) => (
        <mesh key={i} position={b.pos} rotation={b.rot} scale={b.scale} castShadow>
          <boxGeometry args={[1.8, 0.1, 1]} />
          <primitive object={codeMat} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

function GlowParticles({ count = 240, radius = 4 }) {
  const points = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = radius * Math.random()
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      arr.set([x, y, z], i * 3)
    }
    return arr
  }, [count, radius])

  useFrame((state, delta) => {
    if (!points.current) return
    points.current.rotation.y += delta * 0.03
  })

  return (
    <points ref={points} rotation={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} sizeAttenuation color={'#a5f3fc'} transparent opacity={0.75} depthWrite={false} />
    </points>
  )
}

function SceneContent({ reduced, parallaxRef }) {
  const pivot = useRef()
  const { camera, mouse } = useThree()

  useFrame((state) => {
    if (!pivot.current) return
    // subtle camera orbit (disabled if reduced)
    if (!reduced) {
      const t = state.clock.elapsedTime * 0.15
      camera.position.x = 2.4 + Math.cos(t) * 0.15
      camera.position.z = 3.4 + Math.sin(t) * 0.15
      camera.lookAt(0, 0.6, 0)
    }

    // parallax tilt based on mouse (desktop only)
    if (parallaxRef.current && !reduced) {
      const targetX = THREE.MathUtils.lerp(parallaxRef.current.rotation.y, mouse.x * 0.35, 0.08)
      const targetY = THREE.MathUtils.lerp(parallaxRef.current.rotation.x, -mouse.y * 0.25, 0.08)
      parallaxRef.current.rotation.set(targetY, targetX, 0)
    }
  })

  return (
    <group ref={pivot}>
      {/* fog for depth */}
      <fog attach="fog" args={["#0b1222", 4, 12]} />

      {/* lighting */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 3]} intensity={1.1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      {/* neon accent lights */}
      <pointLight position={[2.2, 1.8, 1.2]} intensity={1.2} color={'#67e8f9'} distance={6} />
      <pointLight position={[-2.0, 1.2, -1.0]} intensity={1.1} color={'#f472b6'} distance={6} />

      {/* ground soft shadow look */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={'#0b0f19'} roughness={1} metalness={0} />
      </mesh>

      {/* elements wrapped for parallax tilt */}
      <group ref={parallaxRef}>
        <RotatingTechCube position={[0, 1.0, 0]} />
        <FloatingLaptop position={[-1.8, 0, 0.6]} />
        <FloatingCodeBlocks />
      </group>

      <GlowParticles />

      {/* subtle environment tint */}
      <Environment preset="city" />
      <SoftShadows size={8} samples={8} focus={0.5} />
    </group>
  )
}

function Scene({ reduced }) {
  const parallaxRef = useRef()
  return <SceneContent reduced={reduced} parallaxRef={parallaxRef} />
}

export default function Hero3D({ className, reduced = false }) {
  const wrapperRef = useRef(null)

  // Export GLB on key press "g"
  useEffect(() => {
    const handler = (e) => {
      if (e.key.toLowerCase() !== 'g') return
      const canvas = wrapperRef.current?.querySelector('canvas')
      if (!canvas) return
      // traverse scene via renderer instance available on canvas
      const reactFiber = canvas.__r3f
      const scene = reactFiber?.root?.getState?.().scene
      if (!scene) return
      const exporter = new GLTFExporter()
      exporter.parse(
        scene,
        (buffer) => {
          const blob = new Blob([buffer], { type: 'model/gltf-binary' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'hero-scene.glb'
          a.click()
          URL.revokeObjectURL(url)
        },
        (err) => {
          console.error('GLB export error', err)
        },
        { binary: true, animations: [] }
      )
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className={className} ref={wrapperRef}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [2.4, 1.8, 3.4], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor('#0b1222')
          if (reduced) {
            // lower shadow samples and disable tone mapping extras if any
            gl.shadowMap.enabled = false
          }
        }}
      >
        <Scene reduced={reduced} />
      </Canvas>
    </div>
  )
}

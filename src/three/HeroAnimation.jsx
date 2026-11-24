"use client"
import * as THREE from 'three'
import { useRef, useReducer, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, MeshTransmissionMaterial, Environment, Lightformer } from '@react-three/drei'
import { CuboidCollider, BallCollider, Physics, RigidBody, useBeforePhysicsStep } from '@react-three/rapier'
import { easing } from 'maath'

// const accents = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00']
const accents = ['#72EAE0']
const shuffle = (accent = 0) => [
//   { color: 'orange', roughness: 0.1 },
  { color: '#555', roughness: 0.75 },
  { color: '#555', roughness: 0.75 },
  { color: '#555', roughness: 0.75 },
  { color: '#555', roughness: 0.75 },
  { color: 'white', roughness: 0.75 },
  { color: 'white', roughness: 0.75 },
  { color: 'white', roughness: 0.75 },
  { color: 'white', roughness: 0.75 },
  { color: accents[accent], roughness: 0.1, clearcoat: 1, accent: true },
  { color: accents[accent], roughness: 0.1, clearcoat: 1, accent: true },
  { color: accents[accent], roughness: 0.1, clearcoat: 1, accent: true },
  { color: accents[accent], roughness: 0.1, clearcoat: 1, accent: true }
]

// How long after the last pointer move the cluster goes back to stirring itself.
const IDLE_MS = 2500
// Strength of the click-to-scatter burst (impulse at 1 world unit from the click).
const SCATTER = 45

/**
 * @param paused   stop rendering entirely (e.g. hero scrolled out of view)
 * @param drift    let the pointer wander through the cluster when nobody is interacting
 * @param onScatter called each time the visitor clicks/taps to scatter the shapes
 */
export default function HeroAnimation({ paused = false, drift = true, onScatter }) {
  return (
    <div className="w-full h-full canvas-container">
      <Scene paused={paused} drift={drift} onScatter={onScatter} />
    </div>
  );
}

function Scene({ paused, drift, onScatter, ...props }) {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0)
  const connectors = useMemo(() => shuffle(accent), [accent])
  // Per-frame input shared with the bodies, kept in a ref so it never re-renders the scene.
  // `center` is where the cluster gathers; `origin` is where the last scatter came from.
  const input = useRef({ lastMove: -Infinity, scatters: 0, origin: new THREE.Vector3(), center: new THREE.Vector3() })

  return (
    <div className="w-full h-full">
      <Canvas
        onClick={() => {
          click()
          input.current.lastMove = performance.now()
          input.current.scatters += 1
          onScatter?.()
        }}
        onPointerMove={() => { input.current.lastMove = performance.now() }}
        onPointerLeave={() => { input.current.lastMove = -Infinity }}
        frameloop={paused ? "never" : "always"}
        shadows 
        dpr={[1, 1.5]} 
        gl={{ antialias: false }} 
        camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 30 }} 
        performance={{ min: 0.5 }} 
        {...props}
      >
        <color attach="background" args={['#141618']} />
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Physics gravity={[5, -1, -5]}>
          <Pointer input={input} drift={drift} />
          {connectors.map((props, i) => <Connector key={i} input={input} {...props} />) /* prettier-ignore */}
          <Connector input={input} position={[-10, 10, 5]}>
            <Model>
              <MeshTransmissionMaterial backside={true} transmission={1} ior={1.2} thickness={0.4} chromaticAberration={0.2} samples={8} resolution={512} />
            </Model>
          </Connector>
        </Physics>
        {/* <EffectComposer disableNormalPass multisampling={8}>
          <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
        </EffectComposer> */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
          </group>
        </Environment>
      </Canvas>
    </div>
  )
}

function Connector({ position, children, input, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, ...props }) {
  const api = useRef()
  const seenScatters = useRef(input.current.scatters)
  const pos = useMemo(() => position || [r(10), r(10), r(10)], [])
  // Runs once per fixed physics step (60 Hz), not per rendered frame, so the pull
  // toward the center balances gravity the same way at any frame rate. (Per-frame,
  // a slow frame rate let gravity win and the cluster slid off-screen.)
  useBeforePhysicsStep(() => {
    const body = api.current
    if (!body) return
    body.applyImpulse(vec.copy(body.translation()).sub(input.current.center).negate().multiplyScalar(0.2))

    // Burst away from wherever the visitor clicked; the pull above gathers them back.
    if (seenScatters.current !== input.current.scatters) {
      seenScatters.current = input.current.scatters
      vec.copy(body.translation()).sub(input.current.origin)
      const distance = Math.max(vec.length(), 0.6)
      vec.normalize().multiplyScalar(SCATTER / distance)
      vec.z += r(SCATTER * 0.25)
      body.applyImpulse(vec, true)
      body.applyTorqueImpulse({ x: r(3), y: r(3), z: r(3) }, true)
    }
  })
  return (
    <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={false}>
      <CuboidCollider args={[0.78, 0.38, 0.58]} />
      <CuboidCollider args={[0.38, 0.78, 0.38]} />
      <CuboidCollider args={[0.78, 0.38, 0.78]} />
      {children ? children : <Model {...props} />}
      {accent && <pointLight intensity={3} distance={2.5} color={props.color} />}
    </RigidBody>
  )
}

/**
 * The invisible ball the visitor pushes the shapes around with. It follows the
 * cursor while the visitor is interacting; otherwise (when `drift` is on) it
 * wanders slowly through the cluster so the hero never sits frozen.
 */
function Pointer({ input, drift }) {
  const ref = useRef()
  const pos = useMemo(() => new THREE.Vector3(), [])
  const target = useMemo(() => new THREE.Vector3(), [])
  useFrame(({ pointer, viewport, clock }, delta) => {
    const live = performance.now() - input.current.lastMove < IDLE_MS
    const { width: w, height: h } = viewport
    // Gather right of center on landscape screens (copy sits left) and a bit
    // high on portrait ones (copy sits at the bottom).
    const center = input.current.center.set(w > h ? w * 0.1 : 0, w > h ? 0 : h * 0.12, 0)
    if (live || !drift) {
      target.set((pointer.x * w) / 2, (pointer.y * h) / 2, 0)
    } else {
      const t = clock.elapsedTime
      target.set(
        center.x + w * 0.1 + Math.sin(t * 0.31) * w * 0.22,
        center.y + Math.sin(t * 0.47 + 1.3) * h * 0.3,
        Math.sin(t * 0.23) * 1.5
      )
    }
    easing.damp3(pos, target, live ? 0.03 : 0.6, Math.min(delta, 0.1))
    input.current.origin.copy(pos)
    ref.current?.setNextKinematicTranslation(pos)
  })
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1]} />
    </RigidBody>
  )
}

function Model({ children, color = 'white', roughness = 0, ...props }) {
  const ref = useRef()
  const { nodes } = useGLTF('/media/thing.glb')
  useFrame((state, delta) => {
    easing.dampC(ref.current.material.color, color, 0.2, delta)
  })
  return (
    <mesh ref={ref} castShadow receiveShadow scale={1} geometry={nodes.Cube.geometry}>
      <meshStandardMaterial metalness={0.2} roughness={roughness} />
      {children}
    </mesh>
  )
}


import * as THREE from "three";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, MeshTransmissionMaterial, Environment, Lightformer } from "@react-three/drei";
import { CuboidCollider, BallCollider, Physics, RigidBody, useBeforePhysicsStep } from "@react-three/rapier";
import { easing } from "maath";

/*
 * The Hexaspire, the Feng Works accent polyhedron, as a physics cluster you
 * can stir and scatter. Shared by the home hero and the feng.works case study.
 *
 * A palette describes one look:
 *   background  scene color (match the page so the canvas disappears into it)
 *   pieces      one entry per solid piece: { color, roughness, accent }
 *   glass       add one transmission piece
 *   tint        pieces near the pointer warm up to the caret teal ("you are here")
 */

const TEAL = "#72EAE0";

// The look the previous feng.works hero shipped with; the case study shows it as it was.
const legacyPieces = [
  ...Array(4).fill({ color: "#555", roughness: 0.75 }),
  ...Array(4).fill({ color: "white", roughness: 0.75 }),
  ...Array(4).fill({ color: TEAL, roughness: 0.1, accent: true }),
];

export const PALETTES = {
  legacy: { background: "#141618", pieces: legacyPieces, glass: true, tint: false },
  light: {
    background: "#F3F3F0",
    pieces: [
      ...Array(4).fill({ color: "#1d2023", roughness: 0.55 }),
      ...Array(3).fill({ color: "#9a9ea2", roughness: 0.7 }),
      ...Array(5).fill({ color: "#ffffff", roughness: 0.8 }),
    ],
    glass: true,
    tint: true,
  },
  dark: {
    background: "#141618",
    pieces: [
      ...Array(4).fill({ color: "#3b3f43", roughness: 0.6 }),
      ...Array(3).fill({ color: "#6f7378", roughness: 0.7 }),
      ...Array(5).fill({ color: "#e6e6e2", roughness: 0.8 }),
    ],
    glass: true,
    tint: true,
  },
};

// How long after the last pointer move the cluster goes back to stirring itself.
const IDLE_MS = 2500;
// Click-to-scatter burst: launch speed (world units/s) right at the click point,
// fading with distance, and how long the cluster flies loose before the pull
// toward the center and the usual drag come back.
const SCATTER_SPEED = 16;
const SCATTER_MS = 1100;
const DAMPING = 4;
const SCATTER_DAMPING = 1.2;
// How close (world units) a piece's center has to be to the pointer's to light up.
// The pointer ball (r = 1) shoves pieces away, so touching ones sit ~1.5–2 out.
const TINT_RADIUS = 1.95;

// Gather right of center on landscape screens (copy sits left) and a bit
// high on portrait ones (copy sits at the bottom).
const defaultGather = (w, h) => (w > h ? [w * 0.1, 0] : [0, h * 0.12]);

/**
 * @param palette      one of PALETTES, or your own
 * @param paused       stop rendering entirely (e.g. scrolled out of view)
 * @param drift        let the pointer wander through the cluster when nobody is interacting
 * @param onScatter    called each time the visitor clicks/taps to scatter the shapes
 * @param eventSource  ref to the element that receives pointer input (defaults to the canvas)
 * @param gather       (viewportWidth, viewportHeight) => [x, y] the cluster gathers around
 * @param lite         cheaper glass for small or touch screens
 * @param distance     camera distance, or (aspect) => distance; further back makes the pieces smaller
 */
export default function Hexaspires({
  palette = PALETTES.legacy,
  paused = false,
  drift = true,
  onScatter,
  eventSource,
  gather = defaultGather,
  lite = false,
  distance = 15,
}) {
  const wrap = useRef(null);
  // Per-frame input shared with the bodies, kept in a ref so it never re-renders the scene.
  // `center` is where the cluster gathers; `origin` is where the pointer ball is.
  const input = useRef({
    lastMove: -Infinity,
    scatters: 0,
    live: false,
    active: false,
    scatterAt: -Infinity,
    origin: new THREE.Vector3(),
    center: new THREE.Vector3(),
    // Where the last click landed, in normalized device coords and on the z = 0 plane.
    clickNdc: new THREE.Vector2(),
    clickPending: false,
    blast: new THREE.Vector3(),
  });
  const scatterRef = useRef(onScatter);
  scatterRef.current = onScatter;

  useEffect(() => {
    const el = eventSource?.current ?? wrap.current;
    if (!el) return;
    const move = () => {
      input.current.lastMove = performance.now();
    };
    const leave = () => {
      input.current.lastMove = -Infinity;
    };
    const click = (e) => {
      if (e.target.closest?.("a, button")) return;
      const rect = wrap.current?.getBoundingClientRect();
      if (!rect || !rect.width || !rect.height) return;
      input.current.lastMove = performance.now();
      input.current.clickNdc.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      // Pointer resolves this into world space on the next frame and fires the burst.
      input.current.clickPending = true;
      scatterRef.current?.();
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    el.addEventListener("click", click);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("click", click);
    };
  }, [eventSource]);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        eventSource={eventSource}
        eventPrefix={eventSource ? "client" : undefined}
        frameloop={paused ? "never" : "always"}
        shadows
        dpr={[1, lite ? 1.5 : 2]}
        gl={{ antialias: !lite, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 30 }}
      >
        <CameraRig distance={distance} />
        <Background color={palette.background} />
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Physics gravity={[5, -1, -5]}>
          <Pointer input={input} drift={drift} gather={gather} />
          {palette.pieces.map((piece, i) => (
            <Piece key={i} input={input} tint={palette.tint} {...piece} />
          ))}
          {palette.glass ? (
            <Piece input={input} position={[-10, 10, 5]} glass>
              <MeshTransmissionMaterial
                backside
                transmission={1}
                ior={1.2}
                thickness={0.4}
                chromaticAberration={0.2}
                samples={lite ? 4 : 8}
                resolution={lite ? 256 : 512}
              />
            </Piece>
          ) : null}
        </Physics>
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
  );
}

/** Keeps the camera at `distance`, re-evaluated whenever the canvas changes shape. */
function CameraRig({ distance }) {
  const camera = useThree((state) => state.camera);
  const aspect = useThree((state) => state.size.width / state.size.height);
  const z = typeof distance === "function" ? distance(aspect) : distance;
  useLayoutEffect(() => {
    camera.position.z = z;
    camera.far = z + 15;
    camera.updateProjectionMatrix();
  }, [camera, z]);
  return null;
}

/** Scene background that eases between themes instead of snapping. */
function Background({ color }) {
  const bg = useMemo(() => new THREE.Color(color), []); // eslint-disable-line react-hooks/exhaustive-deps
  useFrame(({ scene }, delta) => {
    if (scene.background !== bg) scene.background = bg;
    easing.dampC(bg, color, 0.12, Math.min(delta, 0.1));
  });
  return null;
}

function Piece({ position, children, input, color = "white", roughness = 0.75, accent, glass, tint }) {
  const body = useRef();
  const mesh = useRef();
  const seenScatters = useRef(input.current.scatters);
  const heat = useRef(0);
  const r = THREE.MathUtils.randFloatSpread;
  const pos = useMemo(() => position || [r(10), r(10), r(10)], []); // eslint-disable-line react-hooks/exhaustive-deps
  const vec = useMemo(() => new THREE.Vector3(), []);
  const base = useMemo(() => new THREE.Color(color), []); // eslint-disable-line react-hooks/exhaustive-deps
  const hot = useMemo(() => new THREE.Color(TEAL), []);

  // Runs once per fixed physics step (60 Hz), not per rendered frame, so the pull
  // toward the center balances gravity the same way at any frame rate. (Per-frame,
  // a slow frame rate let gravity win and the cluster slid off-screen.)
  useBeforePhysicsStep(() => {
    const b = body.current;
    if (!b) return;

    // After a scatter the pull toward the center is off for a moment, then eases
    // back in (and the drag with it), so the pieces fly out before regathering.
    const since = (performance.now() - input.current.scatterAt) / SCATTER_MS;
    const loose = since < 1;
    const pull = loose ? THREE.MathUtils.smoothstep(since, 0.35, 1) : 1;
    b.applyImpulse(vec.copy(b.translation()).sub(input.current.center).negate().multiplyScalar(0.2 * pull));
    if (loose) b.setLinearDamping(THREE.MathUtils.lerp(SCATTER_DAMPING, DAMPING, pull));
    else if (b.linearDamping() !== DAMPING) b.setLinearDamping(DAMPING);

    // Launch away from exactly where the visitor clicked; nearer pieces go faster.
    if (seenScatters.current !== input.current.scatters) {
      seenScatters.current = input.current.scatters;
      vec.copy(b.translation()).sub(input.current.blast);
      vec.z *= 0.15; // keep the burst mostly in the screen plane so it reads
      const distance = vec.length();
      if (distance < 1e-3) vec.set(r(1), r(1), 0);
      const speed = SCATTER_SPEED / (1 + distance * 0.45);
      vec.normalize().multiplyScalar(speed * b.mass());
      vec.z += r(speed * 0.12) * b.mass();
      b.applyImpulse(vec, true);
      b.applyTorqueImpulse({ x: r(6), y: r(6), z: r(6) }, true);
    }
  });

  useFrame((_, delta) => {
    const m = mesh.current;
    if (!m || glass) return;
    const dt = Math.min(delta, 0.1);
    easing.dampC(base, color, 0.2, dt);

    if (tint && body.current) {
      // Pieces the pointer passes through light up fast and cool down slowly,
      // so stirring leaves a short teal wake behind it.
      const p = body.current.translation();
      const o = input.current.origin;
      const near = input.current.active && Math.hypot(p.x - o.x, p.y - o.y, p.z - o.z) < TINT_RADIUS;
      heat.current = near ? Math.min(1, heat.current + dt * 5) : Math.max(0, heat.current - dt * 0.8);
    }
    const h = heat.current * heat.current * (3 - 2 * heat.current); // smoothstep
    m.material.color.copy(base).lerp(hot, h);
    m.material.roughness = THREE.MathUtils.lerp(roughness, 0.15, h);
    m.material.emissive.copy(hot).multiplyScalar(h * 0.22);
  });

  return (
    <RigidBody linearDamping={DAMPING} angularDamping={1} friction={0.1} position={pos} ref={body} colliders={false}>
      <CuboidCollider args={[0.78, 0.38, 0.58]} />
      <CuboidCollider args={[0.38, 0.78, 0.38]} />
      <CuboidCollider args={[0.78, 0.38, 0.78]} />
      <Model ref={mesh} roughness={roughness}>
        {children}
      </Model>
      {accent ? <pointLight intensity={3} distance={2.5} color={color} /> : null}
    </RigidBody>
  );
}

/**
 * The invisible ball the visitor pushes the shapes around with. It follows the
 * cursor while the visitor is interacting; otherwise (when `drift` is on) it
 * wanders slowly through the cluster so the scene never sits frozen.
 */
function Pointer({ input, drift, gather }) {
  const ref = useRef();
  const pos = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ pointer, viewport, clock }, delta) => {
    const live = performance.now() - input.current.lastMove < IDLE_MS;
    input.current.live = live;
    input.current.active = live || drift;
    const { width: w, height: h } = viewport;
    const [cx, cy] = gather(w, h);
    const center = input.current.center.set(cx, cy, 0);
    if (input.current.clickPending) {
      // The click point on the z = 0 plane (the viewport is measured there).
      const { clickNdc } = input.current;
      input.current.clickPending = false;
      input.current.blast.set((clickNdc.x * w) / 2, (clickNdc.y * h) / 2, 0);
      input.current.scatterAt = performance.now();
      input.current.scatters += 1;
    }
    if (live || !drift) {
      target.set((pointer.x * w) / 2, (pointer.y * h) / 2, 0);
    } else {
      const t = clock.elapsedTime;
      target.set(
        center.x + Math.sin(t * 0.31) * w * 0.16,
        center.y + Math.sin(t * 0.47 + 1.3) * h * 0.3,
        Math.sin(t * 0.23) * 1.5
      );
    }
    easing.damp3(pos, target, live ? 0.03 : 0.6, Math.min(delta, 0.1));
    input.current.origin.copy(pos);
    ref.current?.setNextKinematicTranslation(pos);
  });
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1]} />
    </RigidBody>
  );
}

function Model({ ref, children, roughness = 0 }) {
  const { nodes } = useGLTF("/media/thing.glb");
  return (
    <mesh ref={ref} castShadow receiveShadow geometry={nodes.Cube.geometry}>
      {children ?? <meshStandardMaterial metalness={0.2} roughness={roughness} />}
    </mesh>
  );
}

useGLTF.preload("/media/thing.glb");

import React, { useRef } from 'react'
import { useGLTF, Text, MeshTransmissionMaterial } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'

export default function Model() {

  const mesh = useRef()
  const textRef = useRef()
  const { nodes } = useGLTF('/media/frame.glb')
  const { viewport } = useThree()

  useFrame (() => {
    mesh.current.rotation.x += 0.005
    mesh.current.rotation.y += 0.005
  })

  const materialProps = useControls({
    thickness: { value: 0.4, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.2, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.05 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.05 },
    chromaticAberration: { value: 0.11, min: 0, max: 1 },
    backside: { value: true },
  })
  return (
    <group scale={viewport.height / 10}>
      <mesh ref={mesh} {...nodes.Cube}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/Untitled.glb')

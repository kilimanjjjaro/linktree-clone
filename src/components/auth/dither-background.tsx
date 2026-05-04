'use client'

import { useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import {
  FRAGMENT_SHADER,
  MAX_CLICKS,
  UNIFORMS,
  VERTEX_SHADER
} from '@/lib/constants/dither-background'

function DitherShader() {
  const { gl } = useThree()

  useFrame((state) => {
    UNIFORMS.uTime.value = state.clock.getElapsedTime()
    const dpr = state.gl.getPixelRatio()
    UNIFORMS.uResolution.value.set(
      state.size.width * dpr,
      state.size.height * dpr
    )
  })

  useEffect(() => {
    const canvas = gl.domElement
    let clickIx = 0

    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const fx = (e.clientX - rect.left) * (canvas.width / rect.width)
      const fy =
        (rect.height - (e.clientY - rect.top)) * (canvas.height / rect.height)
      UNIFORMS.uClickPos.value[clickIx].set(fx, fy)
      UNIFORMS.uClickTimes.value[clickIx] = UNIFORMS.uTime.value
      clickIx = (clickIx + 1) % MAX_CLICKS
    }

    canvas.addEventListener('pointerdown', onPointerDown)

    return () => canvas.removeEventListener('pointerdown', onPointerDown)
  }, [gl])

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        args={[
          {
            vertexShader: VERTEX_SHADER,
            fragmentShader: FRAGMENT_SHADER,
            uniforms: UNIFORMS,
            glslVersion: THREE.GLSL3,
            transparent: true
          }
        ]}
      />
    </mesh>
  )
}

export default function DitherBackground() {
  return (
    <Canvas
      className='absolute inset-0'
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <DitherShader />
    </Canvas>
  )
}

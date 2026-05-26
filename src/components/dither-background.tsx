"use client"

import { useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

import {
  FRAGMENT_SHADER,
  MAX_CLICKS,
  PIXEL_SIZE,
  UNIFORMS,
  VERTEX_SHADER
} from "@/lib/constants/dither-background"

interface Props {
  color?: [number, number, number]
  interactive?: boolean
  pixelSize?: number
}

function DitherShader({
  color,
  interactive = true,
  pixelSize = PIXEL_SIZE
}: Props) {
  const { gl } = useThree()

  useEffect(() => {
    for (let i = 0; i < MAX_CLICKS; i++) {
      UNIFORMS.uClickPos.value[i].set(-1, -1)
      UNIFORMS.uClickTimes.value[i] = 0
    }
  }, [])

  useEffect(() => {
    if (color !== undefined) {
      UNIFORMS.uColor.value.setRGB(
        color[0] / 255,
        color[1] / 255,
        color[2] / 255
      )
    } else {
      UNIFORMS.uColor.value.setHSL(142 / 360, 0.64, 0.79)
    }
  }, [color])

  useFrame((state) => {
    UNIFORMS.uTime.value = state.clock.getElapsedTime()
    UNIFORMS.uPixelSize.value = pixelSize
    const dpr = state.gl.getPixelRatio()
    UNIFORMS.uResolution.value.set(
      state.size.width * dpr,
      state.size.height * dpr
    )
  })

  useEffect(() => {
    if (!interactive) return

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

    window.addEventListener("pointerdown", onPointerDown)

    return () => window.removeEventListener("pointerdown", onPointerDown)
  }, [gl, interactive])

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

export default function DitherBackground({
  color,
  interactive,
  pixelSize
}: Props = {}) {
  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <DitherShader
          color={color}
          interactive={interactive}
          pixelSize={pixelSize}
        />
      </Canvas>
    </div>
  )
}

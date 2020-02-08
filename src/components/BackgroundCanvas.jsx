import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'

import RedCityObject from './RedCityObject'

function Plane({ ...props }) {
  return (
    <mesh {...props} receiveShadow>
      <planeGeometry attach="geometry" args={[5000, 5000, 1, 1]} />
      <meshLambertMaterial attach="material" color="blue" transparent opacity={0.2} />
    </mesh>
  )
}

const Box = props => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const BackgroundCanvas = () => {
  const d = 8.25
  const mouse = useRef({ x: 0, y: 0 })
  return (
    <Canvas camera={{ position: [0, 0, 15] }} shadowMap>
      <ambientLight intensity={1.5} />
      <pointLight intensity={2} position={[-10, -25, -10]} />
      <spotLight
        castShadow
        intensity={1.25}
        angle={Math.PI / 8}
        position={[25, 25, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <fog attach="fog" args={['#cc7b32', 16, 20]} />
      <Suspense fallback={null}>
        <RedCityObject />
      </Suspense>
    </Canvas>
  )
}

export default BackgroundCanvas

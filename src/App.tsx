import { Html, Line, QuadraticBezierLine, useAspect } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";

function Paths() {
  const [isOver, setIsOver] = useState(false);
  const scale = useAspect(window.innerWidth, window.innerHeight);
  console.log({ scale });

  return (
    <>
      <mesh scale={[scale[1], scale[1], 1]}>
        <Line
          points={[
            [0, 0, 0],
            [0.5, 0.25, 0],
            [0.375, 0, 0],
          ]}
          color="red"
          lineWidth={1}
        />
        <QuadraticBezierLine
          start={[0, 0, 0]} // Starting point
          end={[0.5, 0.5, 0]} // Ending point
          mid={[0.5, 0, 0]} // Optional control point
          color="white" // Default
          lineWidth={1} // In pixels (default)
          dashed={false} // Default
        />
      </mesh>
      <mesh
        scale={[scale[1], scale[1], 1]}
        position={[200, 0, 0]}
        onPointerDown={() => setIsOver(!isOver)}
        // onPointerEnter={() => setIsOver(true)}
        // onPointerLeave={() => setIsOver(false)}
      >
        <boxGeometry args={[0.25, 0.25, -1]} />
        <meshBasicMaterial color={isOver ? "red" : "gray"} attach="material" />
        <Html style={{ userSelect: "none", pointerEvents: "none" }}>
          <h1>Hello</h1>
        </Html>
      </mesh>
    </>
  );
}

export function App() {
  return (
    <Canvas
      gl={{ alpha: false }}
      frameloop="demand"
      orthographic={true}
      dpr={window.devicePixelRatio}
    >
      <Paths />
    </Canvas>
  );
}

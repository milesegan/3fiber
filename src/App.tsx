import { Html, Line as DreiLine, useAspect } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useMemo, useState } from "react";
import { Path, Vector3 } from "three";

function Paths() {
  const [isOver, setIsOver] = useState(false);
  const [lineOver, setLineOver] = useState(false);
  const points = useMemo(() => {
    const p = new Path();
    p.quadraticCurveTo(0.375, 0, 0.5, 0.5);
    return p.getPoints(20).map((p) => new Vector3(p.x, p.y, 0));
  }, []);
  const scale = useAspect(window.innerWidth, window.innerHeight);

  return (
    <group scale={[scale[1], scale[1], 1]}>
      <mesh>
        <DreiLine
          points={points}
          color={lineOver ? "red" : "white"}
          lineWidth={10}
          onPointerEnter={() => setLineOver(true)}
          onPointerLeave={() => setLineOver(false)}
        />
      </mesh>
      <mesh position={[0.25, 0, 0]} onPointerDown={() => setIsOver(!isOver)}>
        <boxGeometry args={[0.25, 0.25, -1]} />
        <meshBasicMaterial color={isOver ? "red" : "gray"} attach="material" />
        <Html style={{ userSelect: "none", pointerEvents: "none" }}>
          <h1>Hello</h1>
        </Html>
      </mesh>
    </group>
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

import { TransformControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React, { useState } from "react";
import { useKeyPress } from "./useKeyPress";

function Boxes() {
  const [selected, setSelected] = useState(false);
  const { camera } = useThree();
  const rotateKey = useKeyPress("e");
  const scaleKey = useKeyPress("s");

  function mode() {
    if (scaleKey) return "scale";
    if (rotateKey) return "rotate";
    return "translate";
  }

  function mesh() {
    return (
      <mesh onClick={() => setSelected(true)}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    );
  }

  if (selected) {
    return (
      <TransformControls camera={camera} mode={mode()}>
        {mesh()}
      </TransformControls>
    );
  } else {
    return <mesh onClick={() => setSelected(true)}>{mesh()}</mesh>;
  }
}

export function App() {
  return (
    <Canvas>
      <color attach="background" args={["black"]} />
      <ambientLight intensity={0.1} />
      <spotLight
        intensity={0.6}
        position={[20, 10, 10]}
        angle={0.2}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
      <Boxes />
    </Canvas>
  );
}

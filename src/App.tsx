import { Canvas, useThree } from "@react-three/fiber";
import { useGesture } from "react-use-gesture";
import React, { useState } from "react";

function Boxes() {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [state, set] = useState({
    scale: [1, 1, 1],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    config: { friction: 10 },
  });

  const bind = useGesture({
    onDrag: ({ event, delta: [x, y] }) => {
      event.stopPropagation();
      if (event.shiftKey) {
        set({
          ...state,
          rotation: [
            state.rotation[0] + y / aspect,
            state.rotation[1] + x / aspect,
            0,
          ],
        });
      } else {
        set({
          ...state,
          position: [
            state.position[0] + x / aspect,
            state.position[1] - y / aspect,
            0,
          ],
        });
      }
    },
    onHover: ({ hovering }) =>
      set({ ...state, scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] }),
  });

  return (
    <mesh {...state} {...(bind() as any)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
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

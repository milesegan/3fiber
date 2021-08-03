import { useSpring, a } from "@react-spring/three";
import { Canvas, useThree } from "@react-three/fiber";
import { useGesture } from "react-use-gesture";
import React from "react";

function Boxes() {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [spring, set] = useSpring(() => ({
    scale: [1, 1, 1],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    config: { friction: 10 },
  }));

  const bind = useGesture({
    onDrag: ({ event, offset: [x, y] }) => {
      event.stopPropagation();
      if (event.shiftKey) {
        set.start({ position: [x / aspect, -y / aspect, 0] });
      } else {
        set.start({ rotation: [y / aspect, x / aspect, 0] });
      }
    },
    onHover: ({ hovering }) =>
      set.start({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] }),
  });

  return (
    <a.mesh position={[1, 1, 1]} {...(spring as any)} {...(bind() as any)}>
      <dodecahedronBufferGeometry args={[1, 0]} />
      <meshNormalMaterial />
    </a.mesh>
  );
}

export function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
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

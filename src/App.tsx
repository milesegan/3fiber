import { Canvas, useThree } from "@react-three/fiber";
import { useDrag, useGesture } from "@use-gesture/react";
import React, { useMemo, useState } from "react";
import { BoxBufferGeometry, LineSegments, WireframeGeometry } from "three";

function Boxes({ z = 0 }: { z?: number }) {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [position, setPosition] = useState<[number, number, number]>([0, 0, z]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [scale, setScale] = useState([1, 1, 1]);
  const box = useMemo(() => {
    const boxGeom = new BoxBufferGeometry(2, 2, 2);
    const wireframe = new WireframeGeometry(boxGeom);
    const lines = new LineSegments(wireframe);
    return lines;
  }, []);

  const bind = useGesture({
    onDrag: ({ event, offset: [x, y] }) => {
      event.stopPropagation();
      if (event.shiftKey) {
        setPosition([x / aspect, -y / aspect, 0]);
      } else {
        setRotation([y / aspect, x / aspect, 0]);
      }
    },
    onHover: ({ hovering }) => setScale(hovering ? [1.2, 1.2, 1.2] : [1, 1, 1]),
  });

  const isDragging = false;

  return (
    <primitive
      object={box}
      position={position}
      rotation={rotation}
      scale={scale}
      {...bind()}
    >
      <lineBasicMaterial
        attach="material"
        color={isDragging ? "red" : "white"}
      />
    </primitive>
  );
}

export function App() {
  return (
    <Canvas
      gl={{ alpha: false }}
      frameloop="demand"
      dpr={window.devicePixelRatio}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Boxes />
    </Canvas>
  );
}

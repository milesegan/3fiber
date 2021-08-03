import { Canvas, useThree } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import React, { useState } from "react";
import { useMemo } from "react";
import { BoxBufferGeometry, LineSegments, WireframeGeometry } from "three";

function Boxes({ z = 0 }: { z?: number }) {
  const { viewport } = useThree();
  const [position, setPosition] = useState<[number, number, number]>([0, 0, z]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const box = useMemo(() => {
    const boxGeom = new BoxBufferGeometry(2, 2, 2);
    const wireframe = new WireframeGeometry(boxGeom);
    const lines = new LineSegments(wireframe);
    return lines;
  }, []);

  const bind = useDrag(({ event, offset: [x, y] }) => {
    event.stopPropagation();
    const aspect = viewport.getCurrentViewport().factor;
    if (event.shiftKey) {
      if (Math.abs(x) > Math.abs(y)) {
        setRotation([x / 20, rotation[1], 0]);
      } else {
        setRotation([rotation[0], y / 20, 0]);
      }
    } else {
      setPosition([x / aspect, -y / aspect, z]);
    }
  });

  return (
    <primitive
      object={box}
      position={position}
      rotation={rotation}
      {...(bind() as any)}
    >
      <lineBasicMaterial attach="material" />
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

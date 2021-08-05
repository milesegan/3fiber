import { Canvas, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { TransformControls } from "three-stdlib";
import { useKeyPress } from "./useKeyPress";

const colors = ["red", "orange", "green", "blue", "purple"];

function Boxes() {
  const { camera, gl, scene } = useThree();
  const boxRefs = useRef<{ [key: string]: any }>({});
  const rotateKey = useKeyPress("e");
  const scaleKey = useKeyPress("s");
  const transform = useRef<TransformControls>();

  useEffect(() => {
    transform.current = new TransformControls(camera, gl.domElement);
    scene.add(transform.current);
  }, [camera, scene, gl]);

  useEffect(() => {
    if (scaleKey) {
      transform.current?.setMode("scale");
    } else if (rotateKey) {
      transform.current?.setMode("rotate");
    } else {
      transform.current?.setMode("translate");
    }
  }, [scaleKey, rotateKey]);

  function selectBox(index: number) {
    console.log({ index, ref: boxRefs.current[String(index)], transform });
    transform.current?.detach();
    transform.current?.attach(boxRefs.current[String(index)]);
  }

  const meshes = colors.map((color, index) => {
    return (
      <mesh
        key={index}
        ref={(c) => (boxRefs.current[String(index)] = c)}
        position={[-2 + index, 0, 0]}
        onClick={() => selectBox(index)}
      >
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  });

  return <>{meshes}</>;
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

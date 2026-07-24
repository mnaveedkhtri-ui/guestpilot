"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 90;
const RADIUS = 5.2;
const CONNECTION_DISTANCE = 2.1;
const SIGNAL_COUNT = 5;

function randomSpherePoint(radius: number) {
  // Even-ish distribution across a sphere shell, with some radial jitter so
  // the cloud reads as volumetric rather than a flat globe outline.
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const r = radius * (0.75 + Math.random() * 0.25);
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta) * 0.6,
    r * Math.cos(phi)
  );
}

function useNetworkGeometry() {
  return useMemo(() => {
    const nodes: THREE.Vector3[] = Array.from({ length: NODE_COUNT }, () =>
      randomSpherePoint(RADIUS)
    );

    const linePositions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < CONNECTION_DISTANCE) {
          linePositions.push(
            nodes[i].x,
            nodes[i].y,
            nodes[i].z,
            nodes[j].x,
            nodes[j].y,
            nodes[j].z
          );
        }
      }
    }

    const nodePositions = new Float32Array(nodes.length * 3);
    nodes.forEach((node, i) => {
      nodePositions[i * 3] = node.x;
      nodePositions[i * 3 + 1] = node.y;
      nodePositions[i * 3 + 2] = node.z;
    });

    const signalIndices = Array.from({ length: SIGNAL_COUNT }, () =>
      Math.floor(Math.random() * nodes.length)
    );

    return {
      nodes,
      nodePositions,
      linePositions: new Float32Array(linePositions),
      signalIndices,
    };
  }, []);
}

function Network({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const signalsRef = useRef<THREE.Mesh[]>([]);
  const { nodes, nodePositions, linePositions, signalIndices } = useNetworkGeometry();

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.06;
      // Gentle parallax toward the pointer position, eased rather than snapped.
      group.current.rotation.x +=
        (pointer.current.y * 0.25 - group.current.rotation.x) * 0.03;
      group.current.rotation.z +=
        (pointer.current.x * -0.12 - group.current.rotation.z) * 0.03;
    }

    const t = state.clock.elapsedTime;
    signalsRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = t * 1.2 + i * 1.7;
      const pulse = (Math.sin(phase) + 1) / 2; // 0..1
      const scale = 0.06 + pulse * 0.09;
      mesh.scale.setScalar(scale);
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.6 + pulse * 1.8;
    });
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#8b93a3"
          transparent
          opacity={0.75}
          sizeAttenuation
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4f5bd5" transparent opacity={0.18} />
      </lineSegments>

      {signalIndices.map((index, i) => (
        <mesh
          key={index}
          position={nodes[index]}
          ref={(el) => {
            if (el) signalsRef.current[i] = el;
          }}
        >
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial
            color="#f0a93b"
            emissive="#f0a93b"
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function NetworkScene() {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <div
      className="h-full w-full"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
          y: ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
        };
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={30} color="#4f5bd5" />
        <Network pointer={pointer} />
      </Canvas>
    </div>
  );
}

import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function HistoricalModel() {
  const { scene } = useGLTF('/north.glb');
  
  React.useEffect(() => {
    // Clone scene to compute pure local bounding box without parent group's world position
    const clone = scene.clone();
    clone.position.set(0, 0, 0);
    clone.rotation.set(0, 0, 0);
    clone.scale.set(1, 1, 1);
    clone.updateMatrixWorld(true);
    
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    const scale = 2;
    // Offset scene so bottom is at Y=0 and it's locally centered, accounting for scale
    scene.position.x = -center.x * scale;
    scene.position.z = -center.z * scale;
    scene.position.y = -box.min.y * scale;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={2} />;
}

export function HistoricalStatue({ position }) {
  return (
    <group position={position}>
      {/* 3D Model loaded from public directory */}
      <Suspense fallback={null}>
        <HistoricalModel />
      </Suspense>
    </group>
  );
}


function GeopoliticsModel() {
  const { scene } = useGLTF('/east.glb');
  
  React.useEffect(() => {
    const clone = scene.clone();
    clone.position.set(0, 0, 0);
    clone.rotation.set(0, 0, 0);
    clone.scale.set(1, 1, 1);
    clone.updateMatrixWorld(true);
    
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    const scale = 2;
    
    scene.position.x = -center.x * scale;
    scene.position.z = -center.z * scale;
    scene.position.y = -box.min.y * scale;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={2} />;
}

export function GeopoliticsStatue({ position }) {
  return (
    <group position={position}>
      <Suspense fallback={null}>
        <GeopoliticsModel />
      </Suspense>
    </group>
  );
}

function SportsModel() {
  const { scene } = useGLTF('/south.glb');
  
  React.useEffect(() => {
    const clone = scene.clone();
    clone.position.set(0, 0, 0);
    clone.rotation.set(0, 0, 0);
    clone.scale.set(1, 1, 1);
    clone.updateMatrixWorld(true);
    
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    const scale = 2;
    // AI models often have stray vertices extending below the visual base.
    // Adjust this manual offset to lift the object higher.
    const manualOffsetY = 0.5;
    
    scene.position.x = -center.x * scale;
    scene.position.z = -center.z * scale;
    scene.position.y = -box.min.y * scale + manualOffsetY;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={2} />;
}

export function SportsStatue({ position }) {
  return (
    <group position={position}>
      <Suspense fallback={null}>
        <SportsModel />
      </Suspense>
    </group>
  );
}

function InfrastructureModel() {
  const { scene } = useGLTF('/west.glb');
  
  React.useEffect(() => {
    const clone = scene.clone();
    clone.position.set(0, 0, 0);
    clone.rotation.set(0, 0, 0);
    clone.scale.set(1, 1, 1);
    clone.updateMatrixWorld(true);
    
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    const scale = 4;
    
    scene.position.x = -center.x * scale;
    scene.position.z = -center.z * scale;
    scene.position.y = -box.min.y * scale;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={4} />;
}

export function InfrastructureStatue({ position }) {
  return (
    <group position={position}>
      <Suspense fallback={null}>
        <InfrastructureModel />
      </Suspense>
    </group>
  );
}

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

const SPEED = 5;

const isValidPosition = (x, z) => {
  const inHub = x > -9.5 && x < 9.5 && z > -9.5 && z < 9.5;
  const inNorth = x > -9.5 && x < 9.5 && z > -29.5 && z < -10.5;
  const inSouth = x > -9.5 && x < 9.5 && z > 10.5 && z < 29.5;
  const inEast = x > 10.5 && x < 29.5 && z > -9.5 && z < 9.5;
  const inWest = x > -29.5 && x < -10.5 && z > -9.5 && z < 9.5;
  
  const inNorthDoor = x > -3 && x < 3 && z >= -10.5 && z <= -9.5;
  const inSouthDoor = x > -3 && x < 3 && z >= 9.5 && z <= 10.5;
  const inEastDoor = z > -3 && z < 3 && x >= 9.5 && x <= 10.5;
  const inWestDoor = z > -3 && z < 3 && x >= -10.5 && x <= -9.5;

  // Block center pedestals (2x2 area)
  const hitNorthPedestal = x > -1.5 && x < 1.5 && z > -21.5 && z < -18.5;
  const hitSouthPedestal = x > -1.5 && x < 1.5 && z > 18.5 && z < 21.5;
  const hitEastPedestal = x > 18.5 && x < 21.5 && z > -1.5 && z < 1.5;
  const hitWestPedestal = x > -21.5 && x < -18.5 && z > -1.5 && z < 1.5;

  if (hitNorthPedestal || hitSouthPedestal || hitEastPedestal || hitWestPedestal) {
    return false;
  }

  return inHub || inNorth || inSouth || inEast || inWest || inNorthDoor || inSouthDoor || inEastDoor || inWestDoor;
};

export default function Player({ active = true }) {
  const { camera } = useThree();
  const [, get] = useKeyboardControls();
  const direction = useRef(new THREE.Vector3());
  const frontVector = useRef(new THREE.Vector3());
  const sideVector = useRef(new THREE.Vector3());

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 1.6, 5); // 1.6 is approx eye level in meters
  }, [camera]);

  useFrame((state, delta) => {
    if (!active) return; // Disable movement when an exhibit is open

    const { forward, backward, left, right } = get();

    // Determine movement direction
    frontVector.current.set(0, 0, Number(backward) - Number(forward));
    sideVector.current.set(Number(left) - Number(right), 0, 0);

    direction.current
      .subVectors(frontVector.current, sideVector.current)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    // Calculate new positions
    const newX = camera.position.x + direction.current.x * delta;
    const newZ = camera.position.z + direction.current.z * delta;

    // Apply X movement if valid
    if (isValidPosition(newX, camera.position.z)) {
      camera.position.x = newX;
    }
    // Apply Z movement if valid
    if (isValidPosition(camera.position.x, newZ)) {
      camera.position.z = newZ;
    }
    
    // Keep eye level constant
    camera.position.y = 1.6;
  });

  return null;
}

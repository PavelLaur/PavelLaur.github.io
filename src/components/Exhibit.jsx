import React, { useState, Suspense } from 'react';
import { useCursor, useTexture } from '@react-three/drei';

function ExhibitCanvas({ imageUrl }) {
  const texture = useTexture(imageUrl);
  return (
    <mesh position={[0, 0, 0.11]}>
      <planeGeometry args={[3.6, 2.6]} />
      <meshStandardMaterial map={texture} color="#ffffff" />
    </mesh>
  );
}

export default function Exhibit({ position, rotation = [0, 0, 0], title, imageUrl, onClick }) {
  const [hovered, setHovered] = useState(false);
  
  // Change cursor to pointer when hovering over an exhibit
  useCursor(hovered);

  return (
    <group position={position} rotation={rotation} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      {/* Frame */}
      <mesh 
        castShadow 
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[4, 3, 0.2]} />
        <meshStandardMaterial color={hovered ? "#ffd700" : "#8b4513"} />
      </mesh>
      
      {/* Canvas */}
      <Suspense fallback={
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[3.6, 2.6]} />
          <meshStandardMaterial color="#cccccc" />
        </mesh>
      }>
        {imageUrl ? (
          <ExhibitCanvas imageUrl={imageUrl} />
        ) : (
          <mesh position={[0, 0, 0.11]}>
            <planeGeometry args={[3.6, 2.6]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        )}
      </Suspense>
    </group>
  );
}

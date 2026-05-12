import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls, KeyboardControls } from '@react-three/drei';
import Museum from './components/Museum';
import ExhibitModal from './components/ExhibitModal';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
];

export default function App() {
  const [selectedExhibit, setSelectedExhibit] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const controlsRef = useRef();

  useEffect(() => {
    const handleInteraction = (e) => {
      if (!hasStarted) {
        setHasStarted(true);
      }

      if (selectedExhibit) return;

      if (controlsRef.current && controlsRef.current.isLocked) return;

      const isMovementKey = e.type === 'keydown' && ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase());
      const isClick = e.type === 'mousedown';

      // We only want to lock on a left click (button 0) to prevent right-click issues, or movement keys
      if (isMovementKey || (isClick && e.button === 0)) {
        controlsRef.current?.lock();
      }
    };

    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('mousedown', handleInteraction);
    return () => {
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('mousedown', handleInteraction);
    };
  }, [hasStarted, selectedExhibit]);

  // Stop propagation when clicking on UI so we don't re-lock the pointer
  const handleModalClose = () => {
    setSelectedExhibit(null);
    setTimeout(() => {
      controlsRef.current?.lock();
    }, 100);
  };

  const handleExhibitSelect = (exhibit) => {
    setSelectedExhibit(exhibit);
    setTimeout(() => {
      document.exitPointerLock();
    }, 100);
  };

  return (
    <>
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ fov: 75 }}>
          {/* Controls are only active when no exhibit is selected */}
          <PointerLockControls 
            ref={controlsRef}
            onLock={() => setIsLocked(true)}
            onUnlock={() => setIsLocked(false)}
            isLocked={isLocked && !selectedExhibit}
          />
          <Museum onSelectExhibit={handleExhibitSelect} isViewing={!!selectedExhibit} />
        </Canvas>
      </KeyboardControls>

      {/* UI Layer */}
      <div className="ui-layer">
        {!hasStarted && !selectedExhibit && (
          <div className="instructions">
            <h1>3D Museum</h1>
            <p>Click anywhere to enter.</p>
            <p>Use W, A, S, D to walk around. Look around with your mouse.</p>
            <p>Click on an exhibit frame to view details.</p>
          </div>
        )}
        
        {isLocked && !selectedExhibit && <div className="crosshair"></div>}

        {selectedExhibit && (
          <ExhibitModal 
            exhibit={selectedExhibit} 
            onClose={handleModalClose} 
          />
        )}
      </div>
    </>
  );
}

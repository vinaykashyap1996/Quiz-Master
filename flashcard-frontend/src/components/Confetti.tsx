'use client';

import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';

export default function ConfettiEffect() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={250}
      gravity={0.2}
      recycle={false}
    />
  );
}

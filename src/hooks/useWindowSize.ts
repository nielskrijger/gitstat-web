import { useEffect, useState } from 'react';

interface WindowSize {
  readonly width: number;
  readonly height: number;
}

const getWindowSize = (): WindowSize => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState(getWindowSize);

  useEffect((): (() => void) => {
    const handleResize = (): void => {
      setWindowSize(getWindowSize);
    };

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect((): void => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

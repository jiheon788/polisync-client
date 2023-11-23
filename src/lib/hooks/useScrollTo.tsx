import { useEffect, useRef } from 'react';

const useScrollTo = <T extends ReadonlyArray<any>>(dependencies: T) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dependencies]);

  return { targetRef };
};

export default useScrollTo;

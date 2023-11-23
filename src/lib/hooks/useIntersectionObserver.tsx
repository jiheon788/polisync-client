import { useCallback, useEffect, useRef } from 'react';

interface IuseIntersectionObserverProps {
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<any>;
  threshold?: number;
}

const useIntersectionObserver = ({ hasNextPage, fetchNextPage, threshold = 0.1 }: IuseIntersectionObserverProps) => {
  const observerRef = useRef<Element>(null);

  const handleObserver = useCallback<IntersectionObserverCallback>(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    const element = observerRef.current;
    const observer = new IntersectionObserver(handleObserver, { threshold });

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [fetchNextPage, hasNextPage, handleObserver, threshold]);

  return { observerRef };
};

export default useIntersectionObserver;
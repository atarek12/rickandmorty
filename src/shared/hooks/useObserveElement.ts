import { useCallback, useEffect, useRef, useState } from "react";

export function useObserveElement(handleIntersection: () => void) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setInView(true);
      } else {
        setInView(false);
      }
    },
    [handleIntersection]
  );

  useEffect(() => {
    const option: IntersectionObserverInit = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (ref.current) observer.observe(ref.current);
  }, [handleObserver]);

  useEffect(() => {
    if (inView) handleIntersection();
  }, [inView]);

  return { ref };
}

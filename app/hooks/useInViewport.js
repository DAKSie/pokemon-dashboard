"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for IntersectionObserver
 * Lazy-loads and triggers animations only when element is in viewport
 */
export function useInViewport(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        setHasBeenVisible(true);
      } else {
        setIsVisible(false);
      }
    }, {
      threshold: 0.1,
      ...options,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return { ref, isVisible, hasBeenVisible };
}

/**
 * Higher-order component that wraps children with IntersectionObserver
 */
export function LazyLoad({ children, fallback = null, threshold = 0.1 }) {
  const { ref, isVisible, hasBeenVisible } = useInViewport({ threshold });

  return (
    <div ref={ref}>
      {hasBeenVisible ? (
        isVisible ? children : fallback
      ) : (
        fallback
      )}
    </div>
  );
}

import { useState, useEffect, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

export default function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverOptions = {}
): [RefObject<T>, boolean] {
  const { root = null, rootMargin = '0px', threshold = 0, triggerOnce = false } = options;
  
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    
    // Skip if element is not yet available or already intersected in triggerOnce mode
    if (!element || (triggerOnce && isIntersecting)) return;
    
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Create new observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        
        // If triggerOnce is true and component is intersecting, disconnect observer
        if (triggerOnce && entry.isIntersecting && observerRef.current) {
          observerRef.current.disconnect();
        }
      },
      { root, rootMargin, threshold }
    );
    
    // Start observing the element
    observerRef.current.observe(element);
    
    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [root, rootMargin, threshold, triggerOnce, isIntersecting]);
  
  return [elementRef, isIntersecting];
}

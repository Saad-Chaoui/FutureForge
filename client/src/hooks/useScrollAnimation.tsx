import { useEffect } from "react";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
  triggerOnce?: boolean;
}

export default function useScrollAnimation(selector: string, options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    animationClass = "visible",
    triggerOnce = true,
  } = options;

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove(animationClass);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );
    
    elements.forEach((element) => {
      observer.observe(element);
    });
    
    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [selector, threshold, rootMargin, animationClass, triggerOnce]);
}

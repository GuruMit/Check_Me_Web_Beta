"use client"

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  noAnimation?: boolean;
};

const FadeIn = ({
  children,
  delay = 0,
  duration = 700,
  className = '',
  direction = 'up',
  threshold = 0.1,
  noAnimation = false,
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (noAnimation) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, noAnimation]);

  const getDirectionClass = () => {
    if (noAnimation) return '';
    
    switch (direction) {
      case 'up':
        return 'translate-y-10';
      case 'down':
        return 'translate-y-[-10px]';
      case 'left':
        return 'translate-x-10';
      case 'right':
        return 'translate-x-[-10px]';
      default:
        return '';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        isVisible ? 'opacity-100 transform-none' : `opacity-0 ${getDirectionClass()}`,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;

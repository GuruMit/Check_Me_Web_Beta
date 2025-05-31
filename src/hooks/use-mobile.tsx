import * as React from "react";
import { useState, useEffect } from 'react'; // Import useState and useEffect

const MOBILE_BREAKPOINT = 1024;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false); // Initialize with a default value

  useEffect(() => {
    const checkIsMobile = () => { // Encapsulate the check
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    if (typeof window !== 'undefined') {
        checkIsMobile(); // Set initial value,
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const onChange = () => checkIsMobile();
        mql.addEventListener("change", onChange);

        return () => {
          mql.removeEventListener("change", onChange);
        };
    }
  }, []);

  return isMobile;
}
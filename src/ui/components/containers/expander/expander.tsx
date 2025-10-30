import { useEffect, useRef } from 'react';

import './expander.css';

type Props = {
  opened: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export function Expander({ opened, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    let cancelled = false;
    const handleTransitionEnd = () => {
      if (cancelled) return;

      container.style.width = "auto";
      container.removeEventListener("transitionend", handleTransitionEnd);
    }

    if (opened) {
      // Temporarily set to auto to get accurate measurement
      container.style.width = "auto";
      const targetWidth = content.scrollWidth;
      container.style.width = "0px";
      void container.offsetWidth; // Force reflow
      
      container.style.width = targetWidth + "px";
      container.addEventListener("transitionend", handleTransitionEnd);
    } else {
      if (container.style.width === "auto") {
        container.style.width = content.scrollWidth + "px";
        void container.offsetWidth;
      }
      container.style.width = "0px";
    }

    return () => {
      cancelled = true;
      container.removeEventListener("transitionend", handleTransitionEnd);
    }
  }, [opened]);

  return (
    <div className={`expander`} ref={containerRef}>
      <div className="expander-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}

import React, { useRef, useEffect } from "react"
import "./drawer.css";
import CaretCircle from "../../icons/caret-circle";
import { useAccordionContext } from "./accordion-context";

type Props = {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function Drawer({ id, title, children }: Props) {
  const { current, toggle } = useAccordionContext();
  const isOpen = current === id;
  const classes = ["drawer", isOpen ? "open" : "closed"];
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = containerRef.current;
    const content = sectionRef.current;
    if (!section || !content) return;

    let cancelled = false;
    const handleTransitionEnd = () => {
      if (cancelled) return;

      section.style.height = "auto";
      section.removeEventListener("transitionend", handleTransitionEnd);
    }

    if (isOpen) {
      section.style.height = content.scrollHeight + "px";
      section.addEventListener("transitionend", handleTransitionEnd);
    } else {
      if (section.style.height === "auto") {
        section.style.height = content.scrollHeight + "px";
        void section.offsetHeight;
      }
      section.style.height = "0px";
    }

    return () => {
      cancelled = true;
      section.removeEventListener("transitionend", handleTransitionEnd);
    }
  }, [isOpen]);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;
    if (!isOpen) {
      section.style.height = "0px";
    } else {
      section.style.height = "auto";
    }
  }, []);

  return (
    <li className={classes.join(" ")} aria-label={`Collapsible section for ${title}`}>
      <button id={id} onClick={() => toggle(id)}>
        <CaretCircle />
        <span>{title}</span>
      </button>
      <section ref={containerRef} style={{ overflow: 'hidden', transition: 'height 0.5s ease' }}>
        <div ref={sectionRef} className="drawer-content">
          {children}
        </div>
      </section>
    </li>
  );
}

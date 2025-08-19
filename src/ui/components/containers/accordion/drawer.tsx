import React, { useRef, useEffect } from "react"
import "./drawer.css";
import CaretCircle from "../../icons/caret-circle";
import { useAccordionContext } from "./accordion-context";

type Props = {
  id: string;
  title: string;
  children: React.ReactNode;
  open?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function Drawer({ id, title, children, open, size = 'medium' }: Props) {
  const context = useAccordionContext();
  const isOpen = context.isOpen(id);

  useEffect(() => {
    if (open) {
      context.setInitial(id);
    }
  }, []);

  const classes = ["drawer", "glazing", isOpen ? "open" : "closed"];
  const toggleClasses = ["drawer-toggle", `drawer-toggle--${size}`];
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

  return (
    <li className={classes.join(" ")} aria-label={`Collapsible section for ${title}`}>
      <button className={toggleClasses.join(" ")} id={id} onClick={() => context.toggle(id)}>
        <h2>{title}</h2>
        <CaretCircle />
      </button>
      <section ref={containerRef} style={{ overflow: 'hidden', transition: 'height 0.5s ease' }}>
        <div ref={sectionRef} className="drawer-content">
          {children}
        </div>
      </section>
    </li>
  );
}

import React, { useRef } from "react"
import "./drawer.css";

type Props = {
  title: string;
  children: React.ReactNode;
}

export function Drawer({ title, children }: Props) {
  const details = useRef<HTMLDetailsElement>(null);

  return (
    <details aria-label={`Collapsible section for ${title}`} ref={details}>
      <summary>{title}</summary>
      <section>
        {children}
      </section>
    </details>
  );
}

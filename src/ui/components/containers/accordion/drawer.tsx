import React from "react"
import "./drawer.css";

type Props = {
  title: string;
  children: React.ReactNode;
}

export function Drawer({ title, children }: Props) {
  return (
    <details aria-label={`Collapsible section for ${title}`}>
      <summary>{title}</summary>
      <section>
        {children}
      </section>
    </details>
  );
}

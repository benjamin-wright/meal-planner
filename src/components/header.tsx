import React from "react";
import { IconLink } from "./icon-link";

interface HeaderProps {
  title: string;
  icon: React.ReactNode;
  home: boolean;
}

export function Header({ title, home, icon }: HeaderProps) {
  return (
    <nav>
      {home ? (
        <IconLink to="/">
          {icon}
        </IconLink>
      ) : null}
      <h1>{title}</h1>
    </nav>
  );
}

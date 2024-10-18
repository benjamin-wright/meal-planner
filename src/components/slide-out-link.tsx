import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./slide-out-link.module.css";
import IconButton from "@mui/material/IconButton";

interface SlideOutLinkProps {
  content: string;
  to: string;
  delay?: number;
  children: React.ReactNode;
}

export function SlideOutLink({ content, to, delay, children }: SlideOutLinkProps) {
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, delay || 0);
  }, [setActive, delay]);

  const styles = [classes.button, ...(isActive ? [classes.active] : [])].join(
    " "
  );

  return (
    <Link className={styles} to={to}>
      <IconButton className="Button active">
        {children}
      </IconButton>
      <span>{content}</span>
    </Link>
  );
}

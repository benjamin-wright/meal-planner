import { Link } from "react-router-dom";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from "react";
import classes from "./slide-out-link.module.css";
import { CircularIcon } from "./circular-icon";

interface SlideOutLinkProps {
  icon: IconDefinition;
  content: string;
  to: string;
  delay?: number;
}

export function SlideOutLink({ icon, content, to, delay }: SlideOutLinkProps) {
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
      <CircularIcon icon={icon} />
      <span>{content}</span>
    </Link>
  );
}

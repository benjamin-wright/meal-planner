import { Link } from "react-router-dom";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import classes from "./slide-out-link.module.css";

interface SlideOutLinkProps {
  icon: IconDefinition;
  content: string;
  to: string;
  delay: number;
}

export default function SlideOutLink({ icon, content, to, delay }: SlideOutLinkProps) {
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, delay)
  }, [setActive]);

  const styles = [classes.button, ...(isActive ? [classes.active] : [])].join(" ");

  return (
    <Link className={styles} to={to}>
      <span className={classes.wrapper}>
        <FontAwesomeIcon icon={icon} className={classes.icon} fixedWidth />
      </span>
      <span>{content}</span>
    </Link>
  );
}

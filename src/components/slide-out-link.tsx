import { Link } from "react-router-dom";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import classes from "./slide-out-link.module.css";

interface SlideOutLinkProps {
  icon: IconDefinition;
  content: string;
  to: string;
}

export default function SlideOutLink({ icon, content, to }: SlideOutLinkProps) {
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    setTimeout(() => setInitial(false), 1000);
  }, [setInitial]);

  const styles = [classes.button];
  if (!initial) {
    styles.push(classes.slide);
  }

  return (
    <Link className={styles.join(" ")} to={to}>
      <span className={classes.wrapper}>
        <FontAwesomeIcon icon={icon} className={classes.icon} fixedWidth />
      </span>
      <span>{content}</span>
    </Link>
  );
}

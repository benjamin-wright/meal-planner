import { Link } from "react-router-dom";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { CircularIcon } from "./circular-icon";
import classes from "./icon-link.module.css"; 

interface IconLinkProps {
  icon: IconDefinition;
  to: string;
}

export function IconLink({ icon, to }: IconLinkProps) {
  return (
    <Link to={to} className={classes.link}>
      <CircularIcon icon={icon} />
    </Link>
  );
}

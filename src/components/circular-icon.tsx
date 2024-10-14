import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./circular-icon.module.css";

interface CircularIconProps {
  icon: IconDefinition;
  active?: boolean;
}

export function CircularIcon({ icon, active }: CircularIconProps) {
  const className = [classes.wrapper, ...(active ? [classes.active] : [])].join(
    " "
  );

  return (
    <span className={className}>
      <FontAwesomeIcon icon={icon} className={classes.icon} fixedWidth />
    </span>
  );
}

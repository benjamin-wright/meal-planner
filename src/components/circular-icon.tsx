import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./circular-icon.module.css";

interface CircularIconProps {
  icon: IconDefinition;
}

export function CircularIcon({ icon }: CircularIconProps) {
  return (
    <span className={classes.wrapper}>
      <FontAwesomeIcon icon={icon} className={classes.icon} fixedWidth />
    </span>
  );
}

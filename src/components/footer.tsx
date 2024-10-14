import classes from "./footer.module.css";
import { IconLink } from "./icon-link";
import {
  faCalendar,
  faUtensils,
  faCarrot,
  faTags,
  faBalanceScale,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export function Footer() {
  return (
    <nav className={classes.nav}>
      <IconLink to="/settings" icon={faCog} />
      <IconLink to="/units" icon={faBalanceScale} />
      <IconLink to="/categories" icon={faTags} />
      <IconLink to="/ingredients" icon={faCarrot} />
      <IconLink to="/recipies" icon={faUtensils} />
      <IconLink to="/planner" icon={faCalendar} />
    </nav>
  );
}

import classes from "./header.module.css";
import { IconLink } from "./icon-link";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  title: string;
  home: boolean;
}

export function Header({ title, home }: HeaderProps) {
  return (
    <nav className={classes.nav}>
      {home ? <IconLink to="/" icon={faHouse}></IconLink> : null}
      <h1>{title}</h1>
    </nav>
  );
}

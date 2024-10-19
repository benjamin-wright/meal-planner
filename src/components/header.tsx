import { IconLink } from "./icon-link";
import House from "@mui/icons-material/House";

interface HeaderProps {
  title: string;
  home: boolean;
}

export function Header({ title, home }: HeaderProps) {
  return (
    <nav>
      {home ? (
        <IconLink to="/">
          <House />
        </IconLink>
      ) : null}
      <h1>{title}</h1>
    </nav>
  );
}

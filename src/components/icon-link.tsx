import { Link, useLocation } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import classes from "./icon-link.module.css";

interface IconLinkProps {
  to: string;
  children: React.ReactNode;
}

export function IconLink({ to, children }: IconLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={classes.link}>
      <IconButton className={["Button", ... (isActive ? ["active"] : [])].join(" ")}>
        {children}
      </IconButton>
    </Link>
  );
}

import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

interface IconLinkProps {
  to: string;
  children: React.ReactNode;
}

export function IconLink({ to, children }: IconLinkProps) {
  // const location = useLocation();
  // const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <IconButton>{children}</IconButton>
    </Link>
  );
}

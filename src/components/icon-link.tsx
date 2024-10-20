import { Button } from "@mui/material";

interface IconLinkProps {
  to: string;
  children: React.ReactNode;
}

export function IconLink({ to, children }: IconLinkProps) {
  // const location = useLocation();
  // const isActive = location.pathname === to;

  return <Button href={to}>{children}</Button>;
}

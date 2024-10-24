import { Button, SxProps } from "@mui/material";
import { CircleIcon } from "./circle-icon";

interface IconLinkProps {
  to?: string;
  children: React.ReactNode;
  sx?: SxProps;
  onClick?: () => void;
}

export function IconLink({ to, children, sx, onClick }: IconLinkProps) {
  return (
    <Button href={to} sx={sx} onClick={onClick} disableRipple>
      <CircleIcon>{children}</CircleIcon>
    </Button>
  );
}

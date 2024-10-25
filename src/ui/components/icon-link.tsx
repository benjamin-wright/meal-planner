import { Button, ButtonProps, SxProps } from "@mui/material";
import { CircleIcon } from "./circle-icon";

interface IconLinkProps {
  to?: string;
  children: React.ReactNode;
  sx?: SxProps;
  onClick?: () => void;
  color?: ButtonProps["color"];
}

export function IconLink({ to, children, sx, onClick, color }: IconLinkProps) {
  return (
    <Button href={to} sx={sx} onClick={onClick} color={color} disableRipple>
      <CircleIcon>{children}</CircleIcon>
    </Button>
  );
}

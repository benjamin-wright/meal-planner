import { Button, ButtonProps, SxProps } from "@mui/material";
import { CircleIcon } from "./circle-icon";

interface IconLinkProps {
  to?: string;
  children: React.ReactNode;
  sx?: SxProps;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  color?: ButtonProps["color"];
  big?: boolean;
  disabled?: boolean;
  label?: string;
}

export function IconLink({
  to,
  children,
  sx,
  onClick,
  color,
  big,
  disabled,
  label
}: IconLinkProps) {
  return (
    <Button
      href={to}
      sx={{
        fontSize: big ? "1.5em" : "1em",
        ...sx,
      }}
      onClick={onClick}
      color={color}
      disableRipple
      disabled={disabled}
      aria-label={label}
    >
      <CircleIcon>{children}</CircleIcon>
    </Button>
  );
}

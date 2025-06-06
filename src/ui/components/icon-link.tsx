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
}

export function IconLink({
  to,
  children,
  sx,
  onClick,
  color,
  big,
  disabled
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
    >
      <CircleIcon>{children}</CircleIcon>
    </Button>
  );
}

// import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

interface SlideOutLinkProps {
  content: string;
  to: string;
  delay?: number;
  children: React.ReactNode;
}

export function SlideOutLink({
  content,
  to,
  // delay,
  children,
}: SlideOutLinkProps) {
  const theme = useTheme();
  // const [isActive, setActive] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setActive(true);
  //   }, delay || 0);
  // }, [setActive, delay]);

  return (
    <Button
      href={to}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1em",
        minWidth: "3em",
        width: "3em",
        padding: "0.5em 1em 0.5em 0.5em",
        overflow: "hidden",
        fontSize: "1.5em",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
        lineHeight: 1,
        borderRadius: "3em",
      }}
    >
      <Box
        display="flex"
        padding="0.5em"
        borderRadius="50%"
        sx={{
          backgroundColor: theme.palette.text.primary,
          color: theme.palette.primary.main,
        }}
      >
        {children}
      </Box>
      <span>{content}</span>
    </Button>
  );
}

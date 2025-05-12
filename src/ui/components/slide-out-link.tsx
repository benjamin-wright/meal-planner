import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { useState, useEffect } from "react";
import { CircleIcon } from "./circle-icon";

interface SlideOutLinkProps {
  content: string;
  to: string;
  delay?: number;
  children: React.ReactNode;
}

const minWidth = "3em";
const midWidth = "14.75em";
const maxWidth = "15em";

export function SlideOutLink({
  content,
  to,
  delay,
  children,
}: SlideOutLinkProps) {
  const theme = useTheme();
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setExpanded(true);
    }, delay || 0);
  }, [setExpanded, delay]);

  const slideIn = keyframes`
    0% {
      width: ${maxWidth};
    }

    50% {
      width: ${midWidth};
    }

    100% {
      width: ${maxWidth};
    }
  `;

  const spinIn = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

  return (
    <Button
      href={to}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1em",
        minWidth: minWidth,
        width: maxWidth,
        padding: "0.5em 1em 0.5em 0.5em",
        overflow: "hidden",
        fontSize: "1.5em",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        lineHeight: 1,
        borderRadius: minWidth,
        ...(isExpanded && {
          animation: `${slideIn} 1.5s ease-in-out`,
        }),
      }}
    >
      <CircleIcon
        sx={{
          fontSize: "1rem",
          ...(isExpanded && {
            animation: `${spinIn} 1.5s ease-in-out`,
          }),
        }}
      >
        {children}
      </CircleIcon>
      <span>{content}</span>
    </Button>
  );
}

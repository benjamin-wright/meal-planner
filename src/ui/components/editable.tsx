import Delete from "@mui/icons-material/Delete";
import { Box, Card, Collapse, keyframes } from "@mui/material";
import { useState } from "react";
import { IconLink } from "./icon-link";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

interface EditableProps {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function Editable({ title, children }: EditableProps) {
  const [firstRender, setFirstRender] = useState(true);
  const [expanded, setExpanded] = useState(false);

  function onClickHandler() {
    setExpanded(!expanded);
    setFirstRender(false);
  }

  const spinIn = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  `;

  const spinOut = keyframes`
    0% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(0deg);
    }
  `;

  return (
    <Card
      sx={{
        margin: "1em",
        padding: "0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        margin="1em"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <h2>{title}</h2>
        <IconLink
          onClick={onClickHandler}
          sx={{
            transform: "rotate(0deg)",
            animation: `${spinOut} 0.3s ease-in-out`,
            ...(firstRender ? { animation: "none" } : {}),
            ...(expanded
              ? {
                  animation: `${spinIn} 0.3s ease-in-out`,
                  transform: "rotate(180deg)",
                }
              : {}),
          }}
        >
          <KeyboardArrowDown />
        </IconLink>
      </Box>
      <Collapse in={expanded}>
        {children}
        <IconLink>
          <Delete />
        </IconLink>
      </Collapse>
    </Card>
  );
}

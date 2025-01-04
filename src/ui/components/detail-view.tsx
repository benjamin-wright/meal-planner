import {
  Box,
  Card,
  CardActionArea,
  Collapse,
  keyframes,
  Typography,
} from "@mui/material";
import { createContext, PointerEvent, useContext, useState } from "react";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import DragHandle from "@mui/icons-material/DragHandle";
import { DragControls } from "motion/react";
import { IconLink } from "./icon-link";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

const DetailGroupContext = createContext({
  selected: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelected: (_selected: string) => {},
});

interface DetailViewGroupProps {
  children: React.ReactNode; 
}

export function DetailViewGroup({ children }: DetailViewGroupProps) {
  const [selected, setSelected] = useState("");

  return (
    <DetailGroupContext.Provider value={{ selected, setSelected }}>
      {children}
    </DetailGroupContext.Provider>
  );
}

interface DetailViewProps {
  title: string;
  children: React.ReactNode;
  group?: string;
  horizontal?: boolean;
  narrow?: boolean;
  dragControls?: DragControls;
  working?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function DetailView({ title, horizontal, narrow, dragControls, working, children, onEdit, onDelete }: DetailViewProps) {
  const [firstRender, setFirstRender] = useState(true);
  const { selected, setSelected } = useContext(DetailGroupContext);
  const showControls = !!onEdit || !!onDelete;

  function onClickHandler() {
    if (selected === title) {
      setSelected("");
      return;
    }
    setSelected(title);
    setFirstRender(false);
  }

  function onDragStart(e: PointerEvent) {
    if (working) {
      return;
    }
  
    dragControls?.start(e);
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
        padding: "0",
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        alignItems: horizontal ? "center" : "stretch"
      }}
    >
      <CardActionArea onClick={onClickHandler} sx={{
        width: "auto"
      }}>
        <Box
          margin="1em"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="1em"
        >
          { dragControls && (
            <DragHandle onPointerDown={onDragStart} style={{ touchAction: "none" }} sx={{boxSizing: "content-box", padding: "0.4em 0", opacity: working ? 0.4 : 1}} />
          ) }
          <Typography variant="h2" flexGrow="1" fontSize="1.5em">
            {title}
          </Typography>
          { !horizontal && (
            <KeyboardArrowDown
              sx={{
                transform: "rotate(0deg)",
                animation: `${spinOut} 0.3s ease-in-out`,
                ...(firstRender ? { animation: "none" } : {}),
                ...(selected === title
                  ? {
                      animation: `${spinIn} 0.3s ease-in-out`,
                      transform: "rotate(180deg)",
                    }
                  : {}),
              }}
            />
          )}
        </Box>
      </CardActionArea>
      <Collapse in={selected === title} orientation={horizontal ? "horizontal" : "vertical"}>
        <Box margin={narrow ? "0" : "1em"}>
          {children}
          { showControls && (
            <Box
              display="flex"
              justifyContent="space-between"
              paddingTop="0.75em"
            >
              <IconLink sx={{ minWidth: "0" }} onClick={onEdit}>
                <Edit />
              </IconLink>
              <IconLink
                color="error"
                sx={{ minWidth: "0" }}
                onClick={onDelete}
              >
                <Delete />
              </IconLink>
            </Box>
          )}
        </Box>
      </Collapse>
    </Card>
  );
}

import {
  Box,
  Card,
  CardActionArea,
  Chip,
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
  setSelected: (_selected: string) => { },
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
  id?: string;
  title: string;
  children?: React.ReactNode;
  group?: string;
  horizontal?: boolean;
  narrow?: boolean;
  dragControls?: DragControls;
  working?: boolean;
  chip?: string;
  noDelete?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function DetailView({ id, title, horizontal, narrow, dragControls, working, children, chip, noDelete, onEdit, onDelete }: DetailViewProps) {
  const [firstRender, setFirstRender] = useState(true);
  const { selected, setSelected } = useContext(DetailGroupContext);
  const showControls = !!onEdit || !!onDelete;
  const groupId = id || title;

  function onClickHandler() {
    if (selected === groupId) {
      setSelected("");
      return;
    }
    setSelected(groupId);
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
        alignItems: horizontal ? "center" : "stretch",
        overflowX: "hidden",
      }}
    >
      <CardActionArea onClick={onClickHandler} sx={{
        width: horizontal ? "min-content" : "auto"
      }}>
        <Box
          margin={ horizontal ? "0.1em 0.5em"  : "1em"}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="1em"
        >
          {dragControls && (
            <DragHandle onPointerDown={onDragStart} style={{ touchAction: "none" }} sx={{ boxSizing: "content-box", padding: "0.4em 0", opacity: working ? 0.4 : 1 }} />
          )}
          <Typography position="relative" variant="h2" flexGrow="1" fontSize="1.5em" paddingRight={chip ? "2em" : "0"} textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" width="0px">
            {title}
            {chip &&
              <Box position="absolute" right="0" top="0" bottom="0" display="flex" alignItems="center" paddingRight="0.5em">
                <Chip label={chip} size="small" />
              </Box>
            }
          </Typography>
          {!horizontal && (
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
      <Collapse in={selected === groupId} orientation={horizontal ? "horizontal" : "vertical"}>
        <Box margin={narrow ? "0" : "1em"}>
          {children}
          {showControls && (
            <Box
              display="flex"
              justifyContent="space-between"
              paddingTop={horizontal ? "0" : "0.75em"}
            >
              <IconLink sx={{ minWidth: "0" }} onClick={onEdit}>
                <Edit />
              </IconLink>
              <IconLink
                color="error"
                sx={{ minWidth: "0" }}
                onClick={onDelete}
                disabled={noDelete}
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

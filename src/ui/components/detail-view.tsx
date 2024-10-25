import Delete from "@mui/icons-material/Delete";
import { Box, Card, CardActionArea, Collapse, keyframes } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { IconLink } from "./icon-link";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { CircleIcon } from "./circle-icon";

const DetailGroupContext = createContext({
  selected: "",
  setSelected: (_: string) => { },
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
}


export function DetailView({ title, children }: DetailViewProps) {
  const [firstRender, setFirstRender] = useState(true);
  const { selected, setSelected } = useContext(DetailGroupContext);

  function onClickHandler() {
    if (selected === title) {
      setSelected("");
      return;
    }
    setSelected(title);
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
      <CardActionArea onClick={onClickHandler}>
        <Box
          margin="1em"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <h2>{title}</h2>
          <CircleIcon
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
            }}>
            <KeyboardArrowDown />
          </CircleIcon>
        </Box>
      </CardActionArea>
      <Collapse in={selected === title}>
        {children}
        <IconLink>
          <Delete />
        </IconLink>
      </Collapse>
    </Card>
  );
}

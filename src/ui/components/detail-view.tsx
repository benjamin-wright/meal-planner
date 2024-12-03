import {
  Box,
  Card,
  CardActionArea,
  Collapse,
  keyframes,
  Typography,
} from "@mui/material";
import { createContext, useContext, useState } from "react";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

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
}

export function DetailView({ title, horizontal, narrow, children }: DetailViewProps) {
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
        padding: "0",
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        alignItems: horizontal ? "center" : "stretch"
      }}
    >
      <CardActionArea onClick={onClickHandler}>
        <Box
          margin="1em"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="1em"
        >
          <Typography variant="h2" flexGrow="1" fontSize="1.5em">
            {title}
          </Typography>
          { horizontal || (
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
        <Box margin={narrow ? "0" : "1em"}>{children}</Box>
      </Collapse>
    </Card>
  );
}

import Fab from "@mui/material/Fab";
import { Page } from "../../components/page";
import { Replay } from "@mui/icons-material";
import { useContext } from "react";
import { DBContext } from "../../providers/database";

export function List() {
  const { mealStore, extraStore } = useContext(DBContext);

  return <Page title="List" showNav>
    <Fab color="primary" sx={{
      position: "fixed",
      bottom: "2em",
      right: "2em",
    }} onClick={() => {}}>
      <Replay />
    </Fab>
  </ Page>;
}

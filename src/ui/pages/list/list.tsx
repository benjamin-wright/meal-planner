import Fab from "@mui/material/Fab";
import { Page } from "../../components/page";
import { Replay } from "@mui/icons-material";

export function List() {
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

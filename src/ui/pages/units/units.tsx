import { useNavigate } from "react-router-dom";
import { UnitsView } from "./units-view";

export function Units() {
  const navigate = useNavigate();

  return <UnitsView onNav={() => navigate("/data")} />;
}
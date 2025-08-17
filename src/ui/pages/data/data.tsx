import { useNavigate } from "react-router-dom";
import { DataView } from "./data-view";

export function Data() {
  const navigate = useNavigate();

  return <DataView
    onNavigate={(category: string) => navigate(`/${category}`)}
  />;
}

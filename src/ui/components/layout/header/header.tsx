import House from "@mui/icons-material/House";
import { Icon } from "../../inputs/icon/icon";
import "./header.css";

type Props = {
  title: string;
}

export function Header({ title }: Props) {
  return (
    <div className="header glazing">
      <Icon icon={<House />} />
      <h1>{title}</h1>
    </div>
  );
}
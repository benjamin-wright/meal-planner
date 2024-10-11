import { IconLink } from "../components";
import {
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

export function Units() {
  return (
    <div className="window">
      <section className="title">
        <IconLink
          icon={faArrowLeft}
          to="/"
        />
      </section>
      <section className="flex">
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface SlideOutLinkProps {
  icon: IconDefinition;
  content: string;
  to: string;
}

export default function SlideOutLink({ icon, content, to }: SlideOutLinkProps) {
  const [initial, setInitial] = useState(true);

  const style = {
    height: "1.5em",
    width: `${initial ? "2em" : "auto"}`,
    padding: `${initial ? "0.5em" : "0.5em 1em 0.5em 0.5em"}`,
  };

  return (
    <Link className="button" to={to} style={style}>
      <span className="wrapper">
        <FontAwesomeIcon icon={icon} className="icon" spin />
      </span>
      &nbsp;&nbsp;&nbsp;
      {content}
    </Link>
  );
}

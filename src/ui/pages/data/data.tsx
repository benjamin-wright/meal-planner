import { useNavigate } from "react-router-dom";
import Cutlery from "../../components/icons/cutlery";
import Egg from "../../components/icons/egg";
import Scales from "../../components/icons/scales";
import Tag from "../../components/icons/tag";
import { FatIconButton } from "../../components/inputs/fat-icon-button/fat-icon-button";
import { Page } from "../../components/layout/page/page";

import "./data.css"

export function Data() {
  const navigate = useNavigate();

  return <Page title="Data">
    <section className="data-view">
      {
        [
          { icon: <Cutlery />, name: "recipies", link: "recipies" },
          { icon: <Egg />, name: "items", link: "items" },
          { icon: <Tag />, name: "categories", link: "categories" },
          { icon: <Scales />, name: "units", link: "units" },
        ].map(({ icon, name, link }) => (
          <FatIconButton id={name} key={name} content={name} icon={icon} onClick={() => navigate(`/${link}`)} />
        ))
      }
    </section>
  </Page>;
}

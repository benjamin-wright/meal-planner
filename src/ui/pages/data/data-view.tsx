import Cutlery from "../../components/icons/cutlery";
import Egg from "../../components/icons/egg";
import FastFood from "../../components/icons/fast-food";
import Scales from "../../components/icons/scales";
import Shopping from "../../components/icons/shopping";
import Tag from "../../components/icons/tag";
import { FatIconButton } from "../../components/inputs/fat-icon-button/fat-icon-button";
import { Page } from "../../components/layout/page/page";

import "./data-view.css"

type Props = {
  onNavigate: (category: string) => void;
}

export function DataView({ onNavigate }: Props) {
  return <Page title="Data" onNav={() => onNavigate('home')}>
    <section className="data-view">
      {
        [
          { icon: <Shopping />, name: "misc", link: "misc" },
          { icon: <FastFood />, name: "ready meals", link: "readymeals" },
          { icon: <Cutlery />, name: "recipies", link: "recipies" },
          { icon: <Egg />, name: "ingredients", link: "ingredients" },
          { icon: <Tag />, name: "categories", link: "categories" },
          { icon: <Scales />, name: "units", link: "units" },
        ].map(({ icon, name, link }) => (
          <FatIconButton id={name} key={name} content={name} icon={icon} onClick={() => onNavigate(link)} />
        ))
      }
    </section>
  </Page>;
}

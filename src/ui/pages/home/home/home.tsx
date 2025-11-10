import Check from "../../../components/icons/check";
import House from "../../../components/icons/house";
import Scales from "../../../components/icons/scales";
import Shopping from "../../../components/icons/shopping";
import { BannerButton } from "../../../components/inputs/banner-button/banner-button";
import { Page } from "../../../components/layout/page/page";

import './home.css';
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <Page title="Meal Planner">
      <nav aria-label="main navigation" className="home-nav-list">
        {
          [
            {name: "list", icon: <Check />, to: "/list"},
            {name: "planner", icon: <Shopping />, to: "/planner"},
            {name: "data", icon: <House />, to: "/data"},
            {name: "settings", icon: <Scales />, to: "/settings"},
          ].map(item => (
            <BannerButton key={item.name} icon={item.icon} label={item.name} onClick={() => navigate(item.to)} />
          ))
        }
      </nav>
    </Page>
  );
}

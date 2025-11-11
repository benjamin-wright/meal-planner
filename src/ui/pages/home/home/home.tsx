import Calendar from "../../../components/icons/calendar";
import Cog from "../../../components/icons/cog";
import Database from "../../../components/icons/database";
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
            {name: "list", icon: <Shopping />, to: "/list"},
            {name: "planner", icon: <Calendar />, to: "/planner"},
            {name: "data", icon: <Database />, to: "/data"},
            {name: "settings", icon: <Cog />, to: "/settings"},
          ].map(item => (
            <BannerButton key={item.name} icon={item.icon} label={item.name} onClick={() => navigate(item.to)} />
          ))
        }
      </nav>
    </Page>
  );
}

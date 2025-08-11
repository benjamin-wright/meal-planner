import { CalendarMonth, Checklist, Settings, Storage } from "@mui/icons-material";
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
            {name: "list", icon: <Checklist />, to: "/list"},
            {name: "planner", icon: <CalendarMonth />, to: "/planner"},
            {name: "data", icon: <Storage />, to: "/data"},
            {name: "settings", icon: <Settings />, to: "/settings"},
          ].map(item => (
            <BannerButton key={item.name} icon={item.icon} label={item.name} onClick={() => navigate(item.to)} />
          ))
        }
      </nav>
    </Page>
  );
}

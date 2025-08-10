import { CalendarMonth, Checklist, Settings, Storage } from "@mui/icons-material";
import { BannerButton } from "../../../components/inputs/banner-button/banner-button";
import { Icon } from "../../../components/inputs/icon/icon";
import { Page } from "../../../components/layout/page/page";

import './home.css';

export function Home() {
  return (
    <Page title="Meal Planner">
      <section className="home-nav-list">
        {
          [
            {name: "list", icon: <Icon icon={<Checklist />} />},
            {name: "planner", icon: <Icon icon={<CalendarMonth />} />},
            {name: "data", icon: <Icon icon={<Storage />} />},
            {name: "settings", icon: <Icon icon={<Settings />} />},
          ].map(item => (
            <BannerButton key={item.name} icon={item.icon} label={item.name}  />
          ))
        }
      </section>
    </Page>
  );
}

import { SlideOutLink } from "../components";
import Settings from "@mui/icons-material/Settings"
import Scale from "@mui/icons-material/Scale"
import Sell from "@mui/icons-material/Sell"
import Egg from "@mui/icons-material/Egg"
import RestaurantRounded from "@mui/icons-material/RestaurantRounded";
import CalendarMonth from "@mui/icons-material/CalendarMonth";

export function Home() {
  return (
    <div className="window">
      <section className="title">
        <h1>Meal Planner</h1>
      </section>
      <section className="flex">
        {[
          { name: "planner", icon: CalendarMonth },
          { name: "recipies", icon: RestaurantRounded },
          { name: "ingredients", icon: Egg },
          { name: "categories", icon: Sell },
          { name: "units", icon: Scale },
          { name: "settings", icon: Settings },
        ].map((category, index) => (
          <SlideOutLink
            key={category.name}
            to={`/${category.name}`}
            content={category.name}
            delay={100 + (index * 100)}
          >
            <category.icon />
          </SlideOutLink>
        ))}
      </section>
    </div>
  );
}

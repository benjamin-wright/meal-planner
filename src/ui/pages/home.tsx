import { SlideOutLink } from "../components/slide-out-link";
import Scale from "@mui/icons-material/Scale";
import Sell from "@mui/icons-material/Sell";
import Egg from "@mui/icons-material/Egg";
import RestaurantRounded from "@mui/icons-material/RestaurantRounded";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { Page } from "../components/page";
import { Box } from "@mui/material";
import { Checklist, Settings } from "@mui/icons-material";

export function Home() {
  return (
    <Page title="Meal Planner" hideNav>
      <Box
        display="flex"
        flexDirection="column"
        gap="1em"
        height="100%"
        justifyContent="center"
      >
        {[
          { name: "list", icon: Checklist },
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
            delay={100 + index * 100}
          >
            <category.icon />
          </SlideOutLink>
        ))}
      </Box>
    </Page>
  );
}

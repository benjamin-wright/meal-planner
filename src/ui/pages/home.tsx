import { SlideOutLink } from "../components/slide-out-link";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { Page } from "../components/page";
import { Box } from "@mui/material";
import { Checklist, Settings, Storage } from "@mui/icons-material";

export function Home() {
  return (
    <Page title="Meal Planner">
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
          { name: "data", icon: Storage },
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

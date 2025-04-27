import Box from "@mui/material/Box";
import { Page } from "../../components/page";
import RestaurantRounded from "@mui/icons-material/RestaurantRounded";
import { Egg, Scale, Sell, ShoppingBag } from "@mui/icons-material";
import { Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Data() {
  const navigate = useNavigate();

  function navigateTo(category: string) {
    navigate(`/${category}`);
  }

  return <Page title="Data" showNav>
    <Box display="grid" gap="1em" justifyContent="center" overflow="hidden" gridTemplateColumns="50% 50%" padding="0.2em">
      {
        [
          { name: "misc", icon: ShoppingBag},
          { name: "recipies", icon: RestaurantRounded },
          { name: "ingredients", icon: Egg },
          { name: "categories", icon: Sell },
          { name: "units", icon: Scale },
        ].map((category) => (
          <Card key={category.name} sx={{
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1em",
          }} onClick={() => navigateTo(category.name)} >
            <category.icon />
            <Typography textTransform="capitalize">
              {category.name}
            </Typography>
          </Card>
        ))
      }
    </Box>
  </ Page>;
}

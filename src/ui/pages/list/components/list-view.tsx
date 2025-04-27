import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton } from "@mui/material";
import { CheckItem } from "./check-item";
import { ShoppingViewItem } from "./types";
import { ExpandMore } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface ListViewProps {
  items: ShoppingViewItem[];
  categories: string[];
  onCheck(item: ShoppingViewItem): void;
}

export function ListView({ items, categories, onCheck }: ListViewProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const expanded: Record<string, boolean> = {};
    categories.forEach(c => {expanded[c] = true});
    setExpanded(expanded);
  }, [categories])

  return (
    <Box>
      {categories.map(category => (
        <Accordion key={category} expanded={expanded[category] || false} sx={{padding: "0.25em", paddingTop: "0"}}>
          <AccordionSummary 
            expandIcon={
              <IconButton 
                sx={{fontSize: "1em", padding: "0", margin: "0"}}
                onClick={() => setExpanded({...expanded, [category]: !expanded[category]})}
              >
                <ExpandMore />
              </IconButton>
            }
          >
            {category}
          </AccordionSummary>
          <AccordionDetails sx={{padding: "0", display: "flex", flexDirection: "column", gap: "0.25em"}} >
            {items.filter(item => item.category === category).map(item => (
              <CheckItem
                key={item.id}
                item={item}
                onCheck={() => onCheck(item)}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
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

  function checkHandler(category: string, item: ShoppingViewItem) {
    const filtered = items.filter(i => i.category === category);
    const allDone = filtered.every(i => i.id === item.id ? !i.got : i.got);
    if (allDone) {
      setExpanded({...expanded, [category]: false});
    }

    onCheck(item);
  }

  return (
    <Box>
      {categories.map(category => {
        const filtered = items.filter(item => item.category === category);
        const allDone = filtered.every(item => item.got);

        return (
          <Accordion key={category} expanded={expanded[category] || false} sx={{padding: "0.25em", paddingTop: "0", opacity: allDone ? 0.5 : 1}} >            
            <AccordionSummary
              sx={{  }}
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
              {filtered.map(item => (
                <CheckItem
                  key={item.id}
                  item={item}
                  onCheck={() => checkHandler(category, item)}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Box>
  );
}
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton } from "@mui/material";
import { CheckItem } from "./check-item";
import { ShoppingViewItem } from "../../../../services/shopping";
import { ExpandMore } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface ListViewProps {
  items: ShoppingViewItem[];
  categories: string[];
  startTimestamp?: number;
  endTimestamp?: number;
  onCheck(item: ShoppingViewItem): void;
  onEdit(item: ShoppingViewItem): void;
}

export function ListView({ items, categories, startTimestamp, endTimestamp, onCheck, onEdit }: ListViewProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({"got": false});
  const active = [...categories.filter(c => items.some(i => i.category === c && (!i.got || i.pending))), "got"];

  useEffect(() => {
    let changed = false;
    const keys = Object.keys(expanded);

    keys.forEach(category => {
      if (!active.includes(category)) {
        changed = true;
        delete expanded[category];
      }
    });

    active.forEach(category => {
      if (!keys.includes(category)) {
        changed = true;
        expanded[category] = true;
      }
    });

    if (changed) {
      setExpanded({...expanded});
    }
  }, [items]);

  return (
    <Box>
      {active.map(category => {
        // Keep pending items in their original category, not in 'got'
        const filtered = category === "got" 
          ? items.filter(item => item.got && !item.pending) 
          : items.filter(item => (!item.got || item.pending) && item.category === category);
        return (
          <Accordion key={category} expanded={expanded[category] || false} sx={{padding: "0.25em", paddingTop: "0", opacity: category === "got" ? 0.5 : 1}} >            
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
                  startTimestamp={item.pending ? startTimestamp : undefined}
                  endTimestamp={item.pending ? endTimestamp : undefined}
                  onCheck={() => onCheck(item)}
                  onContext={() => onEdit(item)}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Box>
  );
}
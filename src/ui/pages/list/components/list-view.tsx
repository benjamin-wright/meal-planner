import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton } from "@mui/material";
import { CheckItem } from "./check-item";
import { ShoppingViewItem } from "../../../../services/shopping";
import { ExpandMore } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface ListViewProps {
  items: ShoppingViewItem[];
  categories: string[];
  onCheck(item: ShoppingViewItem): void;
  onEdit(item: ShoppingViewItem): void;
}

export function ListView({ items, categories, onCheck, onEdit }: ListViewProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState<string[]>([]);

  useEffect(() => {
    const active = [...categories.filter(c => items.some(i => i.category === c && !i.got)), "got" ];
    setActive(active);

    const expanded: Record<string, boolean> = {
      "got": false,
    };
    categories.forEach(c => {expanded[c] = items.some(i => i.category === c && !i.got)});
    setExpanded(expanded);
  }, [categories]);

  function checkHandler(category: string, item: ShoppingViewItem) {
    const filtered = items.filter(i => i.category === category);
    const allDone = filtered.every(i => i.id === item.id ? !i.got : i.got);
    if (allDone) {
      setActive(active.filter(a => a !== category));
      
      delete expanded[category];
      setExpanded({...expanded});
    }

    onCheck(item);
  }

  function uncheckHandler(category: string, item: ShoppingViewItem) {
    const filtered = items.filter(i => i.category === category);
    const allDone = filtered.every(i => i.got);
    if (allDone) {
      setActive([...categories.filter(c => active.includes(c) || c === item.category), "got" ]);
      setExpanded({...expanded, [item.category]: true});
    }
    onCheck(item);
  }

  return (
    <Box>
      {active.map(category => {
        const filtered = category === "got" ? items.filter(item => item.got) : items.filter(item => !item.got && item.category === category);
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
                  onCheck={() => category === "got" ? uncheckHandler(category, item) : checkHandler(category, item)}
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";
import { useItems } from "../../../hooks/useItems";
import { Item, ItemKind } from "../../../../models/items";
import { Page } from "../../../components/layout/page/page";
import { SlideOutGroup } from "../../../components/containers/slide-out-controls/slide-out-group";
import { SlideOutControl } from "../../../components/containers/slide-out-controls/slide-out-control";
import { Dialog } from "../../../components/containers/dialog/dialog";
import { IconFilter } from "../../../components/inputs/icon-filter/icon-filter";
import { AddButton } from "../../../components/inputs/add-button/add-button";
import Egg from "../../../components/icons/egg";
import FastFood from "../../../components/icons/fast-food";
import Shopping from "../../../components/icons/shopping";

const icons = {
  ingredients: <Egg />,
  readymeals: <FastFood />,
  misc: <Shopping />
}

export function Items() {
  const navigate = useNavigate();
  const [items, deleteItem] = useItems();
  const [categories] = useCategories();

  const [toDelete, setToDelete] = useState<Item | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    ingredients: false,
    readymeals: false,
    misc: false
  });

  return <Page title="Items">
    <IconFilter icons={icons} search={search} filter={filter} onFilter={setFilter} onSearch={setSearch} />
    <SlideOutGroup>
      {items.length === 0 ? <></> : items.filter(item => {
        if (filter.ingredients || filter.readymeals || filter.misc) {
          if (!filter.ingredients && item.kind === ItemKind.Ingredient) return false;
          if (!filter.readymeals && item.kind === ItemKind.Readymeal) return false;
          if (!filter.misc && item.kind === ItemKind.Misc) return false;
        }

        if (search) {
          const searchLower = search.toLowerCase();
          const category = categories.find(c => c.id === item.category)?.name || "";

          const nameMatches = item.name.toLowerCase().includes(searchLower);
          const categoryMatches = category.toLowerCase().includes(searchLower);

          return nameMatches || categoryMatches;
        }

        return true;
      }).map(item => (
        <SlideOutControl
          key={item.id}
          groupId={item.name}
          label={`Item list item for ${item.name}`}
          onEdit={() => navigate(`/items/${item.id}`)}
          onDelete={() => setToDelete(item)}
        >
          {item.name}
        </SlideOutControl>
      ))}
    </SlideOutGroup>
    <AddButton id="add-item-button" onClick={() => navigate(`/items/new`)} />
    <Dialog
      isOpen={!!toDelete}
      prompt="Are you sure you want to delete this item?"
      warning="This action cannot be undone."
      onClose={(accept: boolean) => {
        if (accept && toDelete) {
          deleteItem(toDelete);
        }

        setToDelete(undefined);
      }}
    />
  </Page>;
}

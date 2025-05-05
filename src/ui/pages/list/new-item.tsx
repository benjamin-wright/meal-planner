import { useContext, useEffect, useState } from "react";
import { Ingredient } from "../../../models/ingredients";
import { Form } from "../../components/form";
import { DBContext } from "../../providers/database";
import { Unit, UnitType } from "../../../models/units";
import { SelectObject } from "../../components/select-object";
import { SelectID } from "../../components/select-id";
import Box from "@mui/material/Box";
import { CollectiveInput } from "../../components/units/collective-input";
import { MagnitudeInput } from "../../components/units/magnitude-input";
import { useNavigate, useParams } from "react-router-dom";
import { useForms } from "../../providers/forms";
import { Egg, ShoppingBag } from "@mui/icons-material";
import { SimpleChoiceDialog } from "../../components/simple-choice-dialog";

type PageData = {
  unit: number;
  unitType: UnitType;
  ingredient: number;
  quantity: number;
}

export function NewItem() {
  const navigate = useNavigate();
  const params = useParams();
  const itemId = Number.parseInt(params.id || "")
  const { pushForm, formsResult, returnTo } = useForms("list");

  const { settingStore, ingredientStore, unitStore, shoppingStore } = useContext(DBContext);
  const [units, setUnits] = useState<Unit[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pageData, setPageData] = useState<PageData>({
    unit: 0,
    unitType: UnitType.Count,
    ingredient: 0,
    quantity: 1
  });

  useEffect(() => {
    (async () => {
      if (!ingredientStore || !unitStore || !shoppingStore || !settingStore) {
        return;
      }

      const settings = await settingStore.get();
      const units = await unitStore.getAll();
      const ingredients = await ingredientStore.getAll();

      setUnits(units);
      setIngredients(ingredients);
      setPageData({
        unit: units[0].id,
        unitType: units[0].type,
        ingredient: ingredients[0].id,
        quantity: 1
      });

      if (!Number.isNaN(itemId)) {
        const item = await shoppingStore.get(itemId);
        if (item) {
          let unitId;
          switch (item.unitType) {
            case UnitType.Count:
              unitId = item.unit || 0;
              break;
            case UnitType.Volume:
              unitId = settings.preferredVolumeUnit;
              break;
            case UnitType.Weight:
              unitId = settings.preferredWeightUnit;
              break;
          }

          setPageData({
            unitType: item.unitType,
            unit: unitId,
            ingredient: ingredients.find(i => i.name === item.name)?.id || ingredients[0].id,
            quantity: item.quantity 
          })
        }
      }

      if (formsResult) {
        const { form, response } = formsResult;
        const data = form.body as PageData;
        setPageData(data);

        if (response) {
          switch (response.field) {
            case "unit":
              const unit = units.find(u => u.id === response.response as number);
              if (unit) {
                setPageData({...data, unit: unit.id});
              }
              break;
            case "ingredient":
              setPageData({...data, ingredient: response.response as number});
              break;
            case "misc":
              setPageData({...data, ingredient: response.response as number});
              break;
          }
        }
      }
    })();
  }
  , [ingredientStore, unitStore, formsResult]);

  const unit = units.find(u => u.id === pageData.unit);

  return (
    <Form
      title={`Planner - Extras: ${ params.id ? "Edit" : "New" }`}
      returnTo={`${returnTo}?tab=extras`}
      onDelete={params.id ? async () => {
        if (!shoppingStore) {
          return;
        }

        await shoppingStore.delete(itemId);
        navigate(`${returnTo}`);
      } : undefined}
      onSubmit={async () => {
        if (!shoppingStore) {
          return;
        }

        const ingredient = ingredients.find(i => i.id === pageData.ingredient);
        const unit = units.find(u => u.id === pageData.unit);
        if (!ingredient || !unit) {
          return;
        }

        if (params.id) {
          await shoppingStore.put({
            id: Number.parseInt(params.id),
            name: ingredient.name,
            category: ingredient.category,
            unit: unit.type === UnitType.Count ? unit.id : undefined,
            unitType: unit.type,
            quantity: pageData.quantity,
            got: false
          })
        } else {
          await shoppingStore.add(ingredient.name, ingredient.category, unit.type, unit.type === UnitType.Count ? unit.id : undefined, pageData.quantity, false);
        }

        navigate(`${returnTo}`);
      }}
    >
      <SelectID
        id="item"
        label="item"
        link=""
        bypass
        toLabel={i => i.name}
        items={ingredients}
        value={pageData.ingredient}
        required
        onChange={id => setPageData({...pageData, ingredient: id})}
        onNav={() => setDialogOpen(true)}
      />

      <Box sx={{ display: "flex", flexDirection: "row", gap: "1em", justifyContent: "space-between" }}>
        <SelectObject
          id="unit-type"
          label="unit type"
          items={[UnitType.Count, UnitType.Weight, UnitType.Volume]}
          value={pageData.unitType}
          toLabel={t => t.toString()}
          onChange={(value) => {
            setPageData({...pageData, unitType: value, unit: units.find((unit) => unit.type === value)?.id || 0});
          }}
          sx={{ flexGrow: 1 }}
        />
        
        <SelectID
          id="unit"
          label="unit"
          link={`/units/new?type=${pageData.unitType}`}
          toLabel={u => u.name}
          items={units.filter(u => u.type === pageData.unitType)}
          value={pageData.unit}
          required
          onChange={id => setPageData({...pageData, unit: id})}
          onNav={() => pushForm({ to: "units", from: "list", link: location.pathname, body: pageData })}
          sx={{ flexGrow: 1 }}
        />
      </Box>

      {unit && unit.type === UnitType.Count && (
        <CollectiveInput
          id="quantity"
          label="quantity"
          value={pageData.quantity}
          unit={unit}
          onChange={value => setPageData({...pageData, quantity: value})}
        />
      )}
      {unit && unit.type !== UnitType.Count && (
        <MagnitudeInput
          id="quantity"
          label="quantity"
          value={pageData.quantity}
          unit={unit}
          onChange={value => setPageData({...pageData, quantity: value})}
        />
      )}
      <SimpleChoiceDialog
        open={dialogOpen}
        choices={[
          { name: "Ingredient", icon: <Egg /> },
          { name: "Misc", icon: <ShoppingBag /> }
        ]}
        onClose={(choice) => {
          if (!choice) {
            setDialogOpen(false);
            return;
          }
          
          switch (choice) {
            case "Ingredient":
              pushForm({ to: "ingredients", from: "list", link: location.pathname, body: pageData });
              navigate("/ingredients/new");
              return;
            case "Misc":
              pushForm({ to: "misc", from: "list", link: location.pathname, body: pageData });
              navigate("/misc/new");
              return;
          }
          setDialogOpen(false);
        }}
      />
    </Form>
  );
}

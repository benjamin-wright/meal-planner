import { useContext, useEffect, useState } from "react";
import { Extra } from "../../../models/extras";
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

export function ExtrasEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const { pushForm, formsResult, returnTo } = useForms("planner");

  const { extraStore, ingredientStore, unitStore } = useContext(DBContext);
  const [extra, setExtra] = useState<Extra>({ id: 0, ingredient: 0, unit: 0, quantity: 1 });
  const [unitType, setUnitType] = useState<UnitType>(UnitType.Count);
  const [units, setUnits] = useState<Unit[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if (!extraStore || !ingredientStore || !unitStore) {
        return;
      }

      const units = await unitStore.getAll();
      const ingredients = await ingredientStore.getAll();

      setUnits(units);
      setIngredients(ingredients);

      if (params.id) {
        const extra = await extraStore.get(Number.parseInt(params.id, 10));
        setExtra(extra);
        setUnitType(units.find(u => u.id === extra.unit)?.type || UnitType.Count);
      } else {
        setUnitType(units[0].type);
        setExtra({...extra, ingredient: ingredients[0].id, unit: units[0].id});
      }

      if (formsResult) {
        const { form, response } = formsResult;
        const extra = form.body as Extra;
        setExtra(extra);
        setUnitType(units.find(u => u.id === extra.unit)?.type || UnitType.Count);

        if (response) {
          switch (response.field) {
            case "unit": {
              const unit = units.find(u => u.id === response.response as number);
              if (unit) {
                setUnitType(unit.type);
                setExtra({...extra, unit: unit.id});
              }
              break;
            }
            case "ingredient":
              setExtra({...extra, ingredient: response.response as number});
              break;
            case "misc":
              setExtra({...extra, ingredient: response.response as number});
              break;
          }
        }
      }

    })();
  }
  , [extraStore, ingredientStore, unitStore, formsResult]);

  const unit = units.find(u => u.id === extra.unit);

  return (
    <Form
      title={`Planner - Extras: ${params.id ? "Edit" : "New"}`}
      returnTo={`${returnTo}?tab=extras`}
      onSubmit={async () => {
        if (!extraStore) {
          return;
        }

        if (params.id) {
          await extraStore.put(extra);
        } else {
          await extraStore.add(extra.ingredient, extra.unit, extra.quantity);
        }

        navigate(`${returnTo}?tab=extras`);
      }}
    >
      <SelectID
        id="item"
        label="item"
        link=""
        bypass
        toLabel={i => i.name}
        items={ingredients}
        value={extra.ingredient}
        required
        onChange={id => setExtra({...extra, ingredient: id})}
        onNav={() => setDialogOpen(true)}
      />

      <Box sx={{ display: "flex", flexDirection: "row", gap: "1em", justifyContent: "space-between" }}>
        <SelectObject
          id="unit-type"
          label="unit type"
          items={[UnitType.Count, UnitType.Weight, UnitType.Volume]}
          value={unitType}
          toLabel={t => t.toString()}
          onChange={(value) => {
            setUnitType(value);
            setExtra({...extra, unit: units.find((unit) => unit.type === value)?.id || 0});
          }}
          sx={{ flexGrow: 1 }}
        />
        
        <SelectID
          id="unit"
          label="unit"
          link={`/units/new?type=${unitType}`}
          toLabel={u => u.name}
          items={units.filter(u => u.type === unitType)}
          value={extra.unit}
          required
          onChange={id => setExtra({...extra, unit: id})}
          onNav={() => pushForm({ to: "units", from: "planner", link: location.pathname, body: extra })}
          sx={{ flexGrow: 1 }}
        />
      </Box>

      {unit && unit.type === UnitType.Count && (
        <CollectiveInput
          id="quantity"
          label="quantity"
          value={extra.quantity}
          unit={unit}
          onChange={value => setExtra({...extra, quantity: value})}
        />
      )}
      {unit && unit.type !== UnitType.Count && (
        <MagnitudeInput
          id="quantity"
          label="quantity"
          value={extra.quantity}
          unit={unit}
          onChange={value => setExtra({...extra, quantity: value})}
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
              pushForm({ to: "ingredients", from: "planner", link: location.pathname, body: extra });
              navigate("/ingredients/new");
              return;
            case "Misc":
              pushForm({ to: "misc", from: "planner", link: location.pathname, body: extra });
              navigate("/misc/new");
              return;
          }
          setDialogOpen(false);
        }}
      />
    </Form>
  );
}

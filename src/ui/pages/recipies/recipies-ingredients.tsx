import { useParams } from "react-router-dom";
import { Form } from "../../components/form"
import { useContext, useEffect, useState } from "react";
import { DBContext } from "../../providers/database";
import { Magnitude, Unit, UnitType } from "../../../models/units";
import { Recipie } from "../../../models/recipies";
import { Ingredient } from "../../../models/ingredients";
import { SelectID } from "../../components/select-id";
import { SelectObject } from "../../components/select-object";
import Box from "@mui/material/Box";
import { useForms } from "../../providers/forms";
import { CollectiveInput } from "./components/collective-input";
import { MagnitudeInput } from "./components/magnitude-input";

export function RecipiesIngredients() {
  const params = useParams();
  const { } = useForms("recipies");

  const { unitStore, recipieStore, ingredientStore } = useContext(DBContext);
  const [ ingredients, setIngredients ] = useState<Ingredient[]>([]);
  const [ units, setUnits ] = useState<Unit[]>([]);
  const [ recipie, setRecipie ] = useState<Recipie>({ id: 0, name: "", description: "", serves: 1, time: 1, ingredients: [], steps: [] });
  
  const [ ingredientId, setIngredientId ] = useState<number>(0);
  const [ unitType, setUnitType ] = useState<UnitType>(UnitType.Count);
  const [ unitId, setUnitId ] = useState<number>(0);
  const [ quantity, setQuantity ] = useState<number>(0);
  const [ magnitude, setMagnitude ] = useState<Magnitude>({ singular: "", plural: "", abbrev: "", multiplier: 1 });

  useEffect(() => {
    (async () => {
      if (!unitStore || !recipieStore || !ingredientStore || !params.recipie) {
        return;
      }

      const units = await unitStore.getAll();
      setUnits(units);

      const ingredients = await ingredientStore.getAll();
      setIngredients(ingredients);

      const recipie = await recipieStore.get(Number.parseInt(params.recipie, 10));
      setRecipie(recipie);

      if (params.ingredient) {
        const ingredientIndex = Number.parseInt(params.ingredient, 10);
        if (Number.isNaN(ingredientIndex) || ingredientIndex >= recipie.ingredients.length) {
          return;
        }

        const ingredient = recipie.ingredients[ingredientIndex];
        
        setIngredientId(ingredient.id);
        setUnitType(units.find(u => u.id === ingredient.unit)?.type || unitType);
        setUnitId(ingredient.unit);
        setMagnitude(units.find(u => u.id === ingredient.unit)?.magnitudes[0] || magnitude);
        setQuantity(ingredient.quantity);
      }
    })();
  }, [
    unitStore,
    recipieStore,
  ]);

  function handleUnitTypeChange(type: UnitType) {
    setUnitType(type);
    const unit = units.find(u => u.type === type);
    if (unit) {
      setUnitId(unit.id);
    }
  }

  return (
    <Form
      returnTo={`/recipies/${params.recipie}`}
      title={`Recipies: ${recipie.name}`}
      okButton
    >
      <SelectID
        id="ingredient"
        label="ingredient"
        link="/ingredients/new"
        toLabel={i => i.name}
        items={ingredients}
        value={ingredientId}
        required
        onChange={setIngredientId}
        onNav={() => {}}
      />

      <Box sx={{ display: "flex", flexDirection: "row", gap: "1em", justifyContent: "space-between" }}>
        <SelectObject
          id="unit-type"
          label="unit type"
          items={[UnitType.Count, UnitType.Weight, UnitType.Volume]}
          value={unitType}
          toLabel={t => t.toString()}
          onChange={handleUnitTypeChange}
          sx={{ flexGrow: 1 }}
        />

        <SelectID
          id="unit"
          label="unit"
          link="/units/new"
          toLabel={u => u.name}
          items={units.filter(u => u.type === unitType)}
          value={unitId}
          required
          onChange={setUnitId}
          onNav={() => {}}
          sx={{ flexGrow: 1 }}
        />
      </Box>

      {unitType === UnitType.Count ? (
        <CollectiveInput
          id="quantity"
          label="quantity"
          value={quantity}
          unit={units.find(u => u.id === unitId)}
          onChange={setQuantity}
        />
      ) : (
        <MagnitudeInput
          id="quantity"
          label="quantity"
          value={quantity}
          unit={units.find(u => u.id === unitId)}
          onChange={setQuantity}
        />
      )}
    </Form>
  );
}
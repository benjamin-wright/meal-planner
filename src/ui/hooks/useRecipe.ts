import { useContext, useEffect, useState } from "react";
import { Recipe } from "../../models/recipies";
import { DBContext } from "../providers/database/db-context";
import { useSavedState } from "./useSavedState";
import { CourseType, DishType } from "../../models/meals";
import { Unit } from "../../models/units";
import { Item, ItemKind } from "../../models/items";

export function useRecipe(key: string, recipeId: number | null): [Recipe, (recipe: Recipe) => void, () => Promise<void>, () => void, Unit[], Item[]] {
	const { stores } = useContext(DBContext);
	const [recipe, setRecipe] = useSavedState<Recipe>(key, {
		id: 0,
		name: "",
		description: "",
		serves: 2,
		time: 30,
		ingredients: [],
		steps: [],
		course: CourseType.Dinner,
		dish: DishType.Main
	});
	const [units, setUnits] = useState<Unit[]>([]);
	const [ingredients, setIngredients] = useState<Item[]>([]);

	useEffect(() => {
		if (!stores) {
			return;
		}

		const fetch = async () => {
			const units = await stores.unitStore.getAll();
			setUnits(units);
			
			const ingredients = await stores.itemStore.getByKind(ItemKind.Ingredient);
			setIngredients(ingredients);

			if (!recipeId) {
				return;
			}
			
			const fetchedRecipe = await stores.recipieStore.get(recipeId);
			if (fetchedRecipe) {
				setRecipe(fetchedRecipe);
			}
		};

		fetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recipeId, stores]);

	async function save() {
		if (!stores) {
			return;
		}

		if (recipe.id) {
			await stores.recipieStore.put(recipe);
		} else {
			await stores.recipieStore.add(
				recipe.name,
				recipe.description,
				recipe.serves,
				recipe.time,
				recipe.ingredients,
				recipe.steps,
				recipe.course,
				recipe.dish
			);
		}
	}

	async function newIngredient() {
		const ingredientId = ingredients.length > 0 ? ingredients[0].id : 1;
		const unitId = units.length > 0 ? units[0].id : 1;

		setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { id: ingredientId, quantity: 1, unit: unitId }] });
	}

	return [recipe, setRecipe, newIngredient, save, units, ingredients];
}

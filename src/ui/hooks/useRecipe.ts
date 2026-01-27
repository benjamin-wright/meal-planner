import { useContext, useEffect, useState } from "react";
import { Recipe } from "../../models/recipies";
import { DBContext } from "../providers/database/db-context";
import { useSavedState } from "./useSavedState";
import { useIdCache } from "./useIdCache";

export function useRecipe(key: string, recipeId: number | null): [Recipe, (recipe: Recipe) => void, () => Promise<void>] {
	const { stores } = useContext(DBContext);
	const [recipe, setRecipe] = useSavedState<Recipe>(key, {
		id: 0,
		name: "",
		description: "",
		serves: 0,
		time: 0,
		ingredients: [],
		steps: [],
		course: 2, // Default to Dinner (CourseType.Dinner)
		dish: 1    // Default to Main (DishType.Main)
	});

	useEffect(() => {
		if (!stores || !recipeId) {
			return;
		}

		const fetchRecipe = async () => {
			const fetchedRecipe = await stores.recipieStore.get(recipeId);
			if (fetchedRecipe) {
				setRecipe(fetchedRecipe);
			}
		};

		fetchRecipe();
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

	return [recipe, setRecipe, save];
}

# NomNom PLC

> Plan your meals, build your recipes, and never forget an ingredient again.

<img src="https://github.com/user-attachments/assets/bcfa0b3a-b797-4417-9aed-deeb44fa4155" alt="NomNom PLC home screen" width="280" />

NomNom PLC is a mobile web app for organising your kitchen. Build a library of recipes with their ingredients, plan what you're cooking each week, and let the app compile your shopping list automatically.

Everything is stored locally on your device — no account, no cloud, no tracking.

---

## Install

NomNom PLC is a Progressive Web App (PWA). Open it in your mobile browser and add it to your home screen for a full-screen, app-like experience.

**On iPhone / iPad (Safari):**
1. Open the app URL in Safari
2. Tap the **Share** button (box with arrow)
3. Tap **Add to Home Screen**

**On Android (Chrome):**
1. Open the app URL in Chrome
2. Tap the three-dot menu
3. Tap **Add to Home screen**

---

## How it works

Before you can plan meals or generate a shopping list, you build up your kitchen library in four steps. Each piece builds on the one before:

```
Categories  →  Units  →  Items  →  Recipes
   │                        │           │
   └── groups items          └── used    └── used in
       on your shopping          in          meal plan &
       list by aisle            recipes      shopping list
```

A typical first-time setup looks like this:

1. **Add a few categories** (e.g. *vegetables*, *dairy*, *bakery*) — these become the sections of your shopping list
2. **Check your units** — grams, millilitres, and counts come pre-loaded; add custom ones if you need them
3. **Add your items** — the ingredients you regularly buy, each assigned to a category
4. **Write your recipes** — give each one a name, servings, cooking time, and a list of ingredients with quantities

Once your library is set up, head to the **Planner** to assign recipes to days of the week, then tap **List** to see your consolidated shopping list.

> ⚠️ **Planner and Shopping List are coming soon.** The Data section and recipe library are fully usable today.

---

## Your kitchen library

### Categories

Categories are the aisles of your supermarket. Every item you add belongs to a category, and your shopping list will eventually be grouped by them so you can work through the shop efficiently.

Tap **Data → Categories** to add and reorder your categories.

### Units

Units define how you measure things — by weight (grams, kilograms), by volume (millilitres, litres), or by count (eggs, cans). Each unit can have multiple *magnitudes* so the app can display "500g" and "0.5kg" correctly depending on quantity.

A default set of metric units is pre-loaded. Tap **Data → Units** to add or customise them.

### Items

<img src="https://github.com/user-attachments/assets/23fdd2f3-d08e-4c0a-b674-35140bd85faf" alt="Items list screen" width="280" />

Items are the things you buy. Each item has a name, a category, and a kind:

- **Ingredient** — something you cook with (e.g. *chicken*, *onions*)
- **Ready meal** — a pre-made meal you buy whole (e.g. *pasta pot*); these can appear in the meal planner directly
- **Misc** — anything else you want on your shopping list (e.g. *shampoo*)

Tap **Data → Items**, then **+** to add a new item. Use the filter icons at the top to show only ingredients, ready meals, or misc items.

### Recipes

<img src="https://github.com/user-attachments/assets/e20defc4-c706-43dd-94c4-d9a775593b8f" alt="Recipe edit screen" width="280" />

Recipes bring your items together into a meal. Each recipe has:

- **Name & description**
- **Serves** — how many people it feeds (used to scale quantities on the shopping list)
- **Time** — estimated cooking time in minutes
- **Course** — breakfast, lunch, or dinner
- **Dish** — main, side, starter, or dessert
- **Ingredients** — one or more items with a quantity and unit

Tap **Data → Recipes**, then **+** to create a new recipe. Tap an existing recipe to edit it.

---

## Settings

Tap **Settings** from the home screen to access backup and restore options.

- **Backup** — saves all your data as a JSON file to your device
- **Restore** — loads a previously saved backup, replacing your current data
- **Reset** — wipes all data and returns the app to its initial state

Regular backups are recommended since all data is stored locally on your device.

---

## Contributing

If you're looking to run or contribute to the project, see the [docs/](./docs/) folder:

- [Architecture](./docs/architecture.md)
- [Coding standards](./docs/standards.md)
- [Development setup](./docs/contributions.md)
- [Changelog](./docs/CHANGELOG.md)

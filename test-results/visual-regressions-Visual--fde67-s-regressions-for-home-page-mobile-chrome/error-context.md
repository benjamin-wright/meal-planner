# Test info

- Name: Visual Regressions >> regressions for home-page
- Location: /home/bwright/code/meal-planner/e2e/visual-regressions.spec.ts:47:5

# Error details

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:5173/", waiting until "load"

    at /home/bwright/code/meal-planner/e2e/visual-regressions.spec.ts:48:18
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Visual Regressions', () => {
   4 |   [
   5 |     {
   6 |       name: 'home-page',
   7 |       url: '/',
   8 |       disableAnimations: true
   9 |     },
  10 |     {
  11 |       name: 'meal-list',
  12 |       url: '/list',
  13 |     },
  14 |     {
  15 |       name: 'meal-planner',
  16 |       url: '/planner',
  17 |     },
  18 |     {
  19 |       name: 'data',
  20 |       url: '/data',
  21 |     },
  22 |     {
  23 |       name: 'units',
  24 |       url: '/units',
  25 |     },
  26 |     {
  27 |       name: 'categories',
  28 |       url: '/categories',
  29 |     },
  30 |     {
  31 |       name: 'ingredients',
  32 |       url: '/ingredients',
  33 |     },
  34 |     {
  35 |       name: 'recipies',
  36 |       url: '/recipies',
  37 |     },
  38 |     {
  39 |       name: 'misc',
  40 |       url: '/misc',
  41 |     },
  42 |     {
  43 |       name: 'settings',
  44 |       url: '/settings',
  45 |     },
  46 |   ].forEach(({name, url, disableAnimations}) => {
  47 |     test(`regressions for ${name}`, async ({ page }) => {
> 48 |       await page.goto(url);
     |                  ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  49 |       await page.waitForLoadState('networkidle'); 
  50 |       
  51 |       const screenshot = await page.screenshot({ animations: disableAnimations ? 'disabled' : 'allow' });
  52 |       expect(screenshot).toMatchSnapshot(`regression.${name}.png`);
  53 |     });
  54 |   });
  55 | });
  56 |
```
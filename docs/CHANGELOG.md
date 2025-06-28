# CHANGE LOG ([back](../README.md))

## Version 1.1.4

Bugs:

- [#61](https://github.com/benjamin-wright/meal-planner/issues/61) - Fix broken unit navigation

Enhancements:

- [#36](https://github.com/benjamin-wright/meal-planner/issues/36) - Adding support for readymeals

## Version 1.1.3

Bugs:

- [#59](https://github.com/benjamin-wright/meal-planner/issues/56) - Remove long-press context menu for now

## Version 1.1.2

Enhancements:

- [#56](https://github.com/benjamin-wright/meal-planner/issues/56) - Visualise the time before an item is moved from pending to got
- [#54](https://github.com/benjamin-wright/meal-planner/issues/54) - Simplify the dialog control

## Version 1.1.1

Enhancements:

- [#51](https://github.com/benjamin-wright/meal-planner/issues/51) - Check restored data objects and default unset fields

## Version 1.1.0

Enhancements:

- [#26](https://github.com/benjamin-wright/meal-planner/issues/26) - Add support for meal categories in the planner
- [#48](https://github.com/benjamin-wright/meal-planner/issues/48) - Made a start on factoring out business logic
- [#24](https://github.com/benjamin-wright/meal-planner/issues/24) - Adding undo and redo logic to the list page
- [#25](https://github.com/benjamin-wright/meal-planner/issues/25) - Added 2-second delay before moving checked items to "got" category

## Version 1.0.8

Bugs:

- [#46](https://github.com/benjamin-wright/meal-planner/issues/46) - Reopen ingredient dialog on new ingredient or unit cancel
- [#34](https://github.com/benjamin-wright/meal-planner/issues/34) - Reset list long-touch on touch move and extend timer
- [#30](https://github.com/benjamin-wright/meal-planner/issues/30) - Longer delay on home page animation, and make it much more subtle

## Version 1.0.7

Bugs:

- [#35](https://github.com/benjamin-wright/meal-planner/issues/35) - Recipie page not scrolling
- [#33](https://github.com/benjamin-wright/meal-planner/issues/33) - factoring out a common component
- [#31](https://github.com/benjamin-wright/meal-planner/issues/31) - Cancelling ingredient clears the recipie

## Version 1.0.6

- [#41](https://github.com/benjamin-wright/meal-planner/issues/41) - Adding pipeline for unit tests and lint
- [#42](https://github.com/benjamin-wright/meal-planner/issues/42) - Adding pipeline for publishing from main branch builds

## Version 1.0.5

Bugs:

- [#32](https://github.com/benjamin-wright/meal-planner/issues/32) - unit magnitude picking needs a little leeway to accout for rounding errors
- [#33](https://github.com/benjamin-wright/meal-planner/issues/33) - magnitude and collective pickers round when base multiplier changes
- [#37](https://github.com/benjamin-wright/meal-planner/issues/37) - logic bug in list compiler when adding ingredients from different recipies

## Version 1.0.4

Enhancements:

- [#22](https://github.com/benjamin-wright/meal-planner/issues/22) - create a new "got" column to gather checked items, for a cleaner list UI

Bugs:

- [#20](https://github.com/benjamin-wright/meal-planner/issues/20) - list page was miscalculating ingredient proportions on the list page
- [#21](https://github.com/benjamin-wright/meal-planner/issues/21) - add padding to the list page to deconflict floating buttons from the list

## Version 1.0.3

- [#18](https://github.com/benjamin-wright/meal-planner/issues/18) - auto-collapse categories on list page load if fully checked

## Version 1.0.2

- [#10](https://github.com/benjamin-wright/meal-planner/issues/10) - Add and remove incidental items directly from the list screen

## Version 1.0.1

Enhancements:
- [#7](https://github.com/benjamin-wright/meal-planner/issues/7) - Planner icons now clickable
- [#11](https://github.com/benjamin-wright/meal-planner/issues/11) - Collapse list page categories when last item is checked

Bug Fixes:
- [#6](https://github.com/benjamin-wright/meal-planner/issues/6) - Fixing planner ingredients view not visible in light mode
- [#8](https://github.com/benjamin-wright/meal-planner/issues/8) - List page not respecting category order
- [#9](https://github.com/benjamin-wright/meal-planner/issues/9) - Numeric input occasionally adds very low significant figures

## Version 1.0.0

Initial Release
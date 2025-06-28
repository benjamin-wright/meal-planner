# Meal Planner App - Requirements & Features

[← Back to README](../README.md)

## Overview

The Meal Planner App is a comprehensive web application designed to help users organize their cooking, plan weekly meals, and generate shopping lists. The app provides a complete workflow from recipe management to grocery shopping.

## Core Features

### 1. Recipe Management
- **Recipe Creation & Editing**: Add recipes with detailed information including:
  - Name and description
  - Cooking time (in minutes)
  - Number of servings
  - Meal type (breakfast, lunch, dinner)
  - Ingredient list with quantities and units
  - Step-by-step cooking instructions
- **Recipe Organization**: Filter and browse recipes by meal type
- **Recipe Categories**: Organize recipes by breakfast, lunch, and dinner categories

### 2. Ingredient Management
- **Ingredient Database**: Comprehensive ingredient catalog with:
  - Name and category classification
  - Edible/non-edible classification for grocery organization
- **Category Organization**: Group ingredients into logical categories (e.g., vegetables, dairy, meat)
- **Category Ordering**: Custom ordering of ingredient categories for consistent organization

### 3. Units & Measurements
- **Flexible Unit System**: Support for various measurement types:
  - Weight units (grams, kilograms, ounces, pounds)
  - Volume units (milliliters, liters, cups, tablespoons)
  - Count units (pieces, items, etc.)
- **Unit Conversion**: Automatic conversion between compatible units
- **Preferred Units**: User-configurable preferred units for weight and volume measurements
- **Custom Units**: Create custom measurement units as needed

### 4. Meal Planning
- **Weekly Meal Planner**: Visual weekly meal planning interface with:
  - Drag-and-drop meal organization for dinner planning
  - Separate sections for breakfast, lunch, dinner, and extras
  - Daily meal assignment with customizable serving sizes
- **Smart Scheduling**: 
  - Dinner meals can be assigned to specific days of the week
  - Breakfast and lunch meals are planned as single instances
  - Automatic calculation of ingredient quantities based on servings and days
- **Extras Management**: Plan additional items beyond recipes (snacks, beverages, etc.)

### 5. Shopping List Generation
- **Automatic List Creation**: Generate shopping lists from planned meals
- **Smart Aggregation**: Combine identical ingredients across multiple recipes
- **Unit Conversion**: Convert to preferred units for shopping convenience
- **List Organization**: 
  - Group items by ingredient categories
  - Collapsible category sections for easy navigation
  - Visual progress tracking with checkboxes
- **Interactive Shopping**: 
  - Check off items as you shop
  - Automatic movement of checked items to "got" section after delay
  - Undo/redo functionality for accidental changes
  - Add miscellaneous items directly to the shopping list

### 6. Ready Meals Management
- **Pre-made Meal Catalog**: Manage ready-made or takeaway meals with:
  - Meal name and serving information
  - Cooking/preparation time
  - Meal type classification
- **Quick Planning**: Easily add ready meals to the meal planner without ingredient lists

### 7. Miscellaneous Items
- **Non-food Items**: Manage household and non-edible items:
  - Cleaning supplies, toiletries, etc.
  - Organized by categories like regular ingredients
  - Can be added to shopping lists alongside food items

### 8. Data Management & Settings
- **Data Export/Import**: 
  - Export all application data for backup
  - Import data to restore from backup
  - Full application state preservation
- **Application Reset**: Clear all data and start fresh
- **User Preferences**: 
  - Set preferred measurement units for weight and volume
  - Customizable application settings
- **Data Persistence**: Local storage using IndexedDB for offline functionality

### 9. User Interface Features
- **Responsive Design**: Mobile-first design optimized for phone and tablet use
- **Dark/Light Theme**: Automatic theme switching based on system preferences
- **Navigation**: 
  - Intuitive burger menu navigation
  - Breadcrumb navigation with back buttons
  - Quick access floating action buttons
- **Visual Feedback**: 
  - Smooth animations and transitions
  - Loading states and progress indicators
  - Confirmation dialogs for destructive actions
- **Accessibility**: Clean, readable interface with proper contrast and typography

### 10. Advanced Features
- **Form State Management**: 
  - Intelligent form navigation with state preservation
  - Cross-page form data retention
  - Smart field defaulting and validation
- **Drag & Drop**: Reorder dinner meals by dragging to different days
- **Smart Calculations**: 
  - Automatic ingredient quantity scaling based on servings
  - Multi-day meal planning calculations
  - Unit conversion for optimal shopping display
- **Category Auto-collapse**: Automatic hiding of completed shopping list categories
- **Time-based Actions**: Delayed movement of checked items to maintain clean shopping interface

## Technical Architecture

### Frontend
- **React with TypeScript**: Type-safe component architecture
- **Material-UI**: Consistent design system and components
- **React Router**: Client-side routing and navigation
- **Framer Motion**: Smooth animations and drag-and-drop interactions

### Data Layer
- **IndexedDB**: Local browser database for offline functionality
- **Typed Data Models**: Comprehensive TypeScript models for all entities
- **Data Validation**: Input sanitization and validation throughout
- **Migration Support**: Database schema versioning for updates

### Testing
- **Playwright**: End-to-end testing with visual regression testing
- **Unit Tests**: Component and utility function testing
- **Mobile Testing**: Chrome mobile viewport testing

## User Workflow

1. **Setup**: Configure preferred units and create ingredient categories
2. **Recipe Entry**: Add recipes with ingredients, steps, and metadata
3. **Meal Planning**: Plan weekly meals using the visual planner interface
4. **Shopping**: Generate and use the interactive shopping list
5. **Cooking**: Follow recipes with calculated quantities for planned servings

## Performance & Compatibility

- **Offline-First**: Full functionality without internet connection
- **Mobile Optimized**: Touch-friendly interface designed for mobile devices
- **Fast Loading**: Efficient data loading and caching strategies
- **Cross-Browser**: Compatible with modern web browsers

---

*This requirements document reflects the current feature set as of the application's current state. Features are continuously evolving based on user needs and feedback.*

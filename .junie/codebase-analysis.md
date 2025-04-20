# Zero Craft Codebase Analysis

This document provides an analysis of the Zero Craft codebase to assist with the React migration process. It's formatted to be easily consumed by AI tools during the migration.

## Project Overview

Zero Craft is a crafting simulator application that allows users to:
- Select and combine different items
- View item statistics and properties
- Preview crafting results
- Switch between different languages

## Current Architecture

### Technology Stack

```
- Frontend: Vanilla JavaScript, HTML, CSS
- Build Tools: React Scripts (for the React migration)
- Testing: Cypress for E2E tests
- Package Management: npm
```

### File Structure

```
zero.craft/
├── benchmark/                  # Performance benchmarking
├── build/                      # Build output
├── cypress/                    # E2E tests
│   └── e2e/
│       ├── craft_window.cy.ts  # Tests for crafting window
│       └── item_info.cy.ts     # Tests for item information
├── public/                     # Static assets and current implementation
│   ├── data/                   # Data files (translation, items, materials)
│   ├── textures/               # Texture images and CSS
│   ├── index.html              # Main HTML with UI structure
│   ├── prototype.js            # Utility library
│   ├── tools.js                # Helper functions
│   ├── zero_craft.js           # Main application logic
│   └── standard.css            # Base styling
├── src/                        # React application (migration target)
│   ├── App.tsx                 # Main React component (currently empty)
│   └── index.tsx               # React entry point
├── test/                       # Unit tests
├── .junie/                     # Development guidelines
├── package.json                # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

### Current Implementation

The application is currently implemented using vanilla JavaScript with a monolithic architecture:

1. **UI Structure**: Defined directly in `index.html` with inline styles
2. **Application Logic**: Contained in `zero_craft.js`
3. **Data**: Loaded from JavaScript files in the `data/` directory
4. **Styling**: Mix of inline styles and CSS files

### Key Components

Based on the HTML structure and Cypress tests, the application has these main components:

1. **Language Selector**
   - Allows switching between English, German, and French
   - Updates UI text through translation system

2. **Slots Panel**
   - Displays available slots for crafting
   - Located on the left side of the interface

3. **Craft Window**
   - Main interface for crafting
   - Contains:
     - Item List: Shows available items
     - Preview: Shows crafting results and statistics

4. **Material Selection**
   - Popup interface for selecting materials
   - Triggered when selecting certain items

5. **Quantity Selection**
   - Popup for selecting item quantities
   - Has input field and buttons for confirmation

6. **Item Info**
   - Detailed information about items
   - Shows properties like SheetID, Quality, Family, Color
   - Displays item parts and statistics
   - Triggered by right-clicking items

### Data Flow

The current application uses a procedural approach:

1. Data is loaded from JavaScript files
2. UI is initialized with event handlers
3. User interactions trigger functions that update the UI
4. No clear separation between state and view

### Dependencies

#### Production Dependencies
```
- React: 19.1.0
- React DOM: 19.1.0
- TypeScript: 4.9.5
- React Scripts: 5.0.1
- Testing Libraries: @testing-library/react, @testing-library/jest-dom, etc.
```

#### Development Dependencies
```
- Cypress: 14.3.1
- Babel: 5.8.24
- Mocha: 2.3.4
- Chai: 3.4.1
- Sinon: 1.17.2
- JSHint: 2.8.0
- JSPM: 0.16.15
```

## Migration Challenges

1. **Complex UI Structure**: The UI is currently defined in HTML with inline styles, which needs to be converted to React components.

2. **Global State**: The application likely uses global variables for state management, which needs to be refactored to use React's state management.

3. **Event Handling**: Current event handlers are attached directly to HTML elements, which needs to be converted to React's event system.

4. **Data Loading**: Data is currently loaded from JavaScript files, which needs to be adapted to work with React's component lifecycle.

5. **Styling**: Mix of inline styles and CSS files needs to be converted to a more maintainable approach like CSS-in-JS or CSS Modules.

## Components to Migrate

Here's a prioritized list of components to migrate to React:

1. **App Shell**
   - Main layout structure
   - Language selector

2. **Slots Panel**
   - List of available slots
   - Selection mechanism

3. **Craft Window**
   - Item list component
   - Preview component
   - Stat display

4. **Popup Components**
   - Material selection
   - Quantity selection
   - Item info dialog

5. **Data Services**
   - Translation service
   - Item data service
   - Crafting logic

## Migration Strategy Recommendations

1. **Incremental Approach**: Migrate one component at a time while keeping the application functional.

2. **State Management**: Consider using React Context or a state management library like Redux for global state.

3. **Component Hierarchy**: Design a clear component hierarchy that matches the current UI structure.

4. **TypeScript Integration**: Use TypeScript for all new components to ensure type safety.

5. **Testing Strategy**: Maintain existing Cypress tests and add unit tests for new React components.

## AI-Specific Guidance

When migrating this codebase, consider these AI-friendly approaches:

1. **Component Patterns**: Use consistent patterns for component creation:
   ```tsx
   // Function component with TypeScript
   interface ComponentProps {
     // Props definition
   }

   const Component: React.FC<ComponentProps> = (props) => {
     // Component implementation
     return (
       <div>
         {/* JSX content here */}
       </div>
     );
   };
   ```

2. **State Management**: Use hooks for state management:
   ```tsx
   // Local state
   const [items, setItems] = useState<Item[]>([]);

   // Side effects
   useEffect(() => {
     // Load data or perform side effects
   }, [dependencies]);
   ```

3. **Type Definitions**: Create clear interfaces for data structures:
   ```tsx
   interface Item {
     id: number;
     name: string;
     quality: number;
     // Other properties
   }
   ```

4. **Component Mapping**: Map current HTML structure to React components:
   - `ui:interface:main` → `<MainInterface>`
   - `ui:interface:main:language` → `<LanguageSelector>`
   - `ui:interface:main:slots` → `<SlotsPanel>`
   - `ui:interface:main:craft_window` → `<CraftWindow>`
   - `ui:interface:material_selection` → `<MaterialSelection>`
   - `ui:interface:quantity_selection` → `<QuantitySelection>`
   - `ui:interface:item_info` → `<ItemInfo>`

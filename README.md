# Frontend Technical Assessment — Andi Kharisma Rachmadian

A small React product management dashboard built as part of a Junior Frontend Developer technical assessment.

The application allows users to view, search, filter, create, edit, and delete products using a mock REST API.

## Tech Stack

- React
- JavaScript (ES6+)
- Vite
- Tailwind CSS
- Fetch API
- My JSON Server

## Features

- Product table with:
  - Name
  - Category
  - Price
  - Status
  - Created date
- Indonesian Rupiah currency formatting
- Human-readable date formatting
- Category and status badges
- Search products by name
- Filter products by category
- Filter products by stock status
- View product details
- Create new products
- Edit existing products
- Delete products with confirmation
- Reusable form for create and edit
- Field-level form validation
- Loading state
- Network error handling with retry
- Optimistic UI updates for create, edit, and delete
- Responsive layout

## Getting Started

### Requirements

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/andirachmadian/frontend-assessment-andi-rachmadian.git
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite in your browser. It is typically:

```text
http://localhost:5173
```

## Mock API

This project uses My JSON Server as a mock REST API.

Product endpoint:

```text
https://my-json-server.typicode.com/andirachmadian/frontend-assessment-andi-rachmadian/products
```

The application uses the following API operations:

- GET `/products`
- POST `/products`
- PATCH `/products/:id`
- DELETE `/products/:id`

The initial product data is stored in:

```text
db.json
```

## Project Structure

```text
src/
├── components/
│   ├── DeleteConfirmModal.jsx
│   ├── ProductDetailsModal.jsx
│   ├── ProductFilters.jsx
│   ├── ProductForm.jsx
│   └── ProductTable.jsx
├── services/
│   └── api.js
├── App.jsx
├── index.css
└── main.jsx

db.json
logic-assessment.js
```

## Architecture Overview

### App.jsx

The main application component handles:

- Product state
- Initial data fetching
- Search and filtering
- Create, edit, and delete operations
- Optimistic UI updates
- Modal state
- Loading and error states

### ProductTable.jsx

Displays the list of products in a table and provides actions for:

- View
- Edit
- Delete

### ProductFilters.jsx

Contains:

- Product name search
- Category filter
- Status filter

### ProductForm.jsx

A reusable controlled form used for both creating and editing products.

The form includes validation for:

- Product name
- Category
- Price
- Status

### ProductDetailsModal.jsx

Displays the selected product information in read-only mode.

### DeleteConfirmModal.jsx

Displays a confirmation dialog before deleting a product.

### services/api.js

Contains the functions used to communicate with the mock REST API.

## Form Validation

The product form validates the following fields:

### Name

The name is required and cannot be empty after trimming whitespace.

### Category

The category is required and must be one of the available seeded categories:

- Electronics
- Home & Kitchen
- Apparel

### Price

The price is required, must be numeric, and must be greater than 0.

### Status

The status must be either:

- In Stock
- Out of Stock

The submit button is disabled while the form is invalid or while a request is being submitted.

## Optimistic Updates

The application uses optimistic UI updates for create, edit, and delete operations.

The local React state is updated immediately before waiting for the API response. This makes the interface feel more responsive.

If the API request fails, the application rolls back the local state to its previous value and displays an error notification.

This approach was chosen because My JSON Server simulates write operations and changes are not permanently written back to the repository's `db.json`.

## Mock API Limitation

My JSON Server provides a simulated REST API.

Create, edit, and delete requests can return successful responses, but those changes are not permanently stored in the GitHub `db.json` file and may reset.

For this reason, the application manages the current product state locally after API operations.

## Logic Assessment

The root-level file:

```text
logic-assessment.js
```

contains the two JavaScript logic exercises:

### countCharacterFrequency(text)

Counts the frequency of alphabetic characters while ignoring whitespace, punctuation, and numbers.

### processUserData(users)

Processes an array of users by:

- Filtering users younger than 18
- Ignoring incomplete user data where required fields are missing
- Grouping users by gender
- Calculating the number of users in each group
- Calculating the average age rounded to one decimal place

Both functions are independently exported.

## Available Scripts

Run the development server:

```bash
npm run dev
```

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## Decisions and Trade-offs

### Local State Management

React's built-in `useState` is used for state management because the application is relatively small and the state relationships are straightforward.

Using an additional state management library would introduce unnecessary complexity for the scope of this assessment.

### Reusable Form

The same `ProductForm` component is used for both create and edit operations.

When an existing product is provided, the form operates in edit mode and is pre-filled with the product's current data.

### Client-side Filtering

Search, category filtering, and status filtering are performed on the products already loaded into React state.

For the small dataset used in this assessment, this keeps the implementation simple and responsive.

## What I Would Improve With More Time

With more development time, I would consider adding:

- Pagination for larger product datasets
- Automated unit and component tests
- Success toast notifications
- Improved accessibility and keyboard navigation for modals
- Shared utility functions for currency and date formatting
- A responsive card layout for smaller mobile screens
- More detailed API error messages
- Deployment to a publicly accessible live demo

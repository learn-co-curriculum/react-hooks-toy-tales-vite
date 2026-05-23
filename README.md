# Toy Tales - React Hooks Practice Application

A React application for managing Andy's toy collection. Users can view all toys, add new toys, like toys, and donate toys to GoodWill.

## Features

- ✅ **Display All Toys**: View all toys on page load with their details (name, image, likes count)
- ✅ **Add a Toy**: Submit a form to create a new toy with initial likes set to 0
- ✅ **Like a Toy**: Click the like button to increase a toy's likes count
- ✅ **Donate a Toy**: Click the donate button to remove a toy from the collection

## Setup and Running the Application

All toy data is stored in the `db.json` file. The application uses `json-server` to create a RESTful API.

### Installation
```bash
npm install
```

### Running the Application

Open three separate terminals and run these commands:

**Terminal 1: Start the backend server (port 3001)**
```bash
npm run server
```

**Terminal 2: Start the React development server (port 3000)**
```bash
npm run dev
```

**Terminal 3: Run the test suite**
```bash
npm run test
```

The application will be available at `http://localhost:3000`

## Architecture and Component Structure

### Component Hierarchy

```
App (Root Component)
├── Header (Presentational)
├── ToyForm (Form for creating toys)
└── ToyContainer
    └── ToyCard (Individual toy cards)
```

### State and Props

#### App Component
**State:**
- `showForm` (boolean): Controls visibility of the ToyForm
- `toys` (array): Array of all toy objects from the backend

**Responsibilities:**
- Fetches toys from backend on component mount using `useEffect`
- Manages form visibility toggle
- Handles toy creation, deletion, and like updates
- Passes state and handlers to child components via props

**Event Listeners:**
- `handleClick`: Toggles the form visibility
- `handleAddToy`: Adds a new toy to state after form submission
- `handleDeleteToy`: Removes a toy from state after deletion
- `handleLikeToy`: Updates a toy's likes in state after like button click

**useEffect:**
- Empty dependency array `[]` - Runs once on component mount to fetch toys from `/toys` endpoint

#### ToyContainer Component
**Props:**
- `toys` (array): Array of toy objects to display
- `onDeleteToy` (function): Callback for toy deletion
- `onLikeToy` (function): Callback for updating likes

**Responsibilities:**
- Maps through toys array and renders individual ToyCard components
- Passes toy data and callback functions to each ToyCard

#### ToyCard Component
**Props:**
- `toy` (object): Single toy object with properties: `id`, `name`, `image`, `likes`
- `onDeleteToy` (function): Callback to remove toy from parent state
- `onLikeToy` (function): Callback to update toy likes in parent state

**Responsibilities:**
- Displays toy information (name, image, likes count)
- Handles like button click with PATCH request to `/toys/:id`
- Handles donate button click with DELETE request to `/toys/:id`
- Calls appropriate callback functions to update parent state

**Event Listeners:**
- `handleLike`: Makes PATCH request and calls `onLikeToy` callback
- `handleDelete`: Makes DELETE request and calls `onDeleteToy` callback

#### ToyForm Component
**Props:**
- `onAddToy` (function): Callback to add new toy to parent state

**State:**
- `formData` (object): Form input values with properties: `name`, `image`

**Responsibilities:**
- Manages controlled form inputs
- Handles form submission with POST request to `/toys` endpoint
- Sets initial likes to 0 for new toys
- Clears form after successful submission

**Event Listeners:**
- `handleChange`: Updates formData state as user types
- `handleSubmit`: Validates form, creates new toy, makes POST request

#### Header Component
**Responsibilities:**
- Displays the Toy Tales header image (presentational only, no state or logic)

## API Endpoints

- `GET /toys` - Fetch all toys
- `POST /toys` - Create a new toy
- `PATCH /toys/:id` - Update a toy (used for updating likes)
- `DELETE /toys/:id` - Delete a toy

## Testing

The test suite includes comprehensive tests for all features:

```bash
npm run test
```

**Test Files:**
- `AllToys.test.jsx`: Tests that all toys are displayed on page load
- `ToyForm.test.jsx`: Tests that new toys can be created and displayed
- `Donate.test.jsx`: Tests that toys can be deleted
- `Like.test.jsx`: Tests that likes can be increased

All tests are passing ✅

## Deliverables

- ✅ When the application loads, fetch toys from `/toys` and render them using ToyCard components
- ✅ When the ToyForm is submitted, make a POST request to `/toys` to create a new toy with initial likes set to 0
- ✅ When the "Donate to GoodWill" button is clicked, make a DELETE request to `/toys/:id` to delete the toy
- ✅ When the like button is clicked, make a PATCH request to `/toys/:id` with the updated likes count
- ✅ Add comments and documentation explaining component purpose and logic
- ✅ All tests passing successfully

## Development Notes

- The application uses React Hooks (`useState`, `useEffect`) for state management
- Event handlers and `useEffect` hooks are implemented at the component level where they're needed
- State is lifted to the App component to manage the main toys array
- Controlled forms are used for the ToyForm component
- The application follows React best practices for prop drilling and component composition


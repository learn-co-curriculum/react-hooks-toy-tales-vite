# Toy Tales Project Guide

Toy Tales is a small React CRUD app for managing a collection of toys. The app
loads toys from a local JSON API, displays each toy as a card, lets users create
new toys, like existing toys, and donate toys by removing them from the list.

## Tech Stack

- React for the UI
- Vite for local development and production builds
- JSON Server for the mock REST API
- Vitest and React Testing Library for tests
- ESLint for code quality checks

## Project Structure

```txt
src/
  components/
    App.jsx
    Header.jsx
    ToyCard.jsx
    ToyContainer.jsx
    ToyForm.jsx
  hooks/
    useToys.js
  services/
    toysApi.js
  __tests__/
    AllToys.test.jsx
    Donate.test.jsx
    Like.test.jsx
    ToyForm.test.jsx
    setup.jsx
  index.css
  main.jsx
db.json
eslint.config.js
```

## Architecture

The app is organized around a simple separation of responsibilities.

`App.jsx` is the page-level component. It controls whether the form is visible
and connects the UI to the toy data/actions from `useToys`.

`useToys.js` is the state and behavior layer. It owns the toy collection,
loading state, error state, and CRUD actions:

- load toys
- add a toy
- like a toy
- donate/delete a toy

`toysApi.js` is the data access layer. It is the only place that knows the API
URL and the `fetch` details. Keeping API calls here makes components cleaner and
makes future API changes easier.

`ToyForm.jsx`, `ToyContainer.jsx`, and `ToyCard.jsx` are UI components. They
receive data and callbacks through props instead of fetching or owning global
app state themselves.

## CRUD Flow

### Read Toys

When the app first renders, `useToys` calls `getToys()` from `toysApi.js`.
The returned toy array is stored in React state and passed down to
`ToyContainer`.

```txt
App -> useToys -> getToys -> API -> toys state -> ToyContainer -> ToyCard
```

### Create Toy

`ToyForm` is a controlled form. When the form is submitted, it sends the new toy
data up through `onAddToy`. `useToys` posts the toy to the API, then appends the
created toy to state.

```txt
ToyForm -> onAddToy -> useToys.addToy -> createToy -> API -> update toys state
```

### Update Likes

Each `ToyCard` receives an `onLikeToy` callback. Clicking the like button sends
the selected toy to `useToys`, which calculates the next like count, patches the
server, and replaces the updated toy in state.

```txt
ToyCard -> onLikeToy -> useToys.likeToy -> updateToyLikes -> API -> update toys state
```

### Delete Toy

Clicking `Donate to GoodWill` calls `onDonateToy` with the toy id. `useToys`
deletes the toy from the API, then filters it out of local state.

```txt
ToyCard -> onDonateToy -> useToys.donateToy -> deleteToy -> API -> update toys state
```

## Running The Project

Install dependencies:

```bash
npm install
```

Start the JSON API:

```bash
npm run server
```

Start the React app in another terminal:

```bash
npm run dev
```

Run the tests:

```bash
npm test -- --run
```

Run lint checks:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## API Endpoints

The local API runs at:

```txt
http://localhost:3001/toys
```

Supported operations:

- `GET /toys` gets all toys
- `POST /toys` creates a toy
- `PATCH /toys/:id` updates a toy
- `DELETE /toys/:id` deletes a toy

## Data Shape

Each toy should follow this shape:

```js
{
  id: 1,
  name: "Woody",
  image: "https://example.com/woody.png",
  likes: 8
}
```

When creating a new toy, the form collects `name` and `image`. The app adds
`likes: 0` before saving.

## Development Notes

- Keep API logic in `src/services`.
- Keep reusable stateful logic in `src/hooks`.
- Keep components focused on rendering and user interaction.
- Pass data down through props.
- Pass events up through callback props.
- Add tests when changing user-facing behavior.

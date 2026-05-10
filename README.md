# Toy Tales

A React application for managing Andy's toy collection. Help Andy keep track of his toys, add new ones, like favorites, and donate toys to Goodwill.

## Features

- **View Toy Collection**: Display all toys with their names, images, and like counts
- **Add New Toys**: Submit a form to add new toys to the collection
- **Like Toys**: Click the like button to increase a toy's like count
- **Donate Toys**: Remove toys from the collection by donating them to Goodwill
- **Responsive UI**: Clean, user-friendly interface for managing toys

## Technologies Used

- **Frontend**: React 19, Vite
- **Backend**: JSON Server (for development)
- **Testing**: Vitest, React Testing Library
- **Styling**: CSS

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd toy-tales-lab
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development Setup

1. Start the JSON Server (backend API):
   ```bash
   npm run server
   ```
   This starts the server on `http://localhost:3001`

2. In a new terminal, start the React development server:
   ```bash
   npm run dev
   ```
   This starts the app on `http://localhost:3000`

3. Open your browser and navigate to `http://localhost:3000`

### Running Tests

Run the test suite to verify functionality:
```bash
npm test
```

### Building for Production

Build the application for production:
```bash
npm run build
```

## API Endpoints

The application uses the following REST API endpoints:

- `GET /toys` - Fetch all toys
- `POST /toys` - Create a new toy
- `PATCH /toys/:id` - Update a toy's likes
- `DELETE /toys/:id` - Delete a toy

## Component Structure

- **App**: Main component managing state and API calls
- **Header**: Navigation and form toggle
- **ToyForm**: Form for adding new toys
- **ToyContainer**: Container for displaying toy cards
- **ToyCard**: Individual toy display with like and donate buttons

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

## License

This project is part of a learning exercise and is not licensed for commercial use.

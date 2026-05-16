import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";

function App() {
  const [toys, setToys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(data => {
        setToys(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching toys:', error);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading toys...</p>
      ) : (
        toys.map(toy => (
          <ToyCard key={toy.id} toy={toy} />
        ))
      )}
    </div>
  );
}

function ToyCard({ toy }) {
  return (
    <div className="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} />
      <p>{toy.likes} Likes</p>
      <button>Like</button>
      <button>Donate</button>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
  
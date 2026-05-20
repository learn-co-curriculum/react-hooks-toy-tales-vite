import { useState, useEffect } from "react";
import ToyCard from "./ToyCard";
import ToyForm from "./ToyForm";

function App() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
  }

  function handleLike(toyId) {
    const toy = toys.find((t) => t.id === toyId);
    const updatedLikes = toy.likes + 1;

    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((r) => r.json())
      .then((updatedToy) => {
        const newToys = toys.map((t) =>
          t.id === updatedToy.id ? updatedToy : t
        );
        setToys(newToys);
      });
  }

  function handleDonate(toyId) {
    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: "DELETE",
    }).then(() => {
      const remainingToys = toys.filter((t) => t.id !== toyId);
      setToys(remainingToys);
    });
  }

  return (
    <div>
      <ToyForm onAddToy={handleAddToy} />
      <div id="toy-collection">
        {toys.map((toy) => (
          <ToyCard
            key={toy.id}
            toy={toy}
            onLike={handleLike}
            onDonate={handleDonate}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
import { useState, useEffect } from "react";
import ToyCard from "./ToyCard";
import ToyForm from "./ToyForm";

function ToyContainer() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

    function handleAddToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newToy, likes: 0 }),
    })
      .then((r) => r.json())
      .then((createdToy) => setToys((toys) => [...toys, createdToy]));
  }

    function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setToys((prevToys) => prevToys.filter((toy) => toy.id !== id));
        } else {
          alert("Failed to delete toy");
        }
      });
  }

  function handleLikeToy(id, currentLikes) {
    const updatedLikes = currentLikes + 1;
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        setToys((prevToys) =>
          prevToys.map((toy) =>
            toy.id === id ? updatedToy : toy
          )
        );
      });
  }

  return (
    <div>
      <ToyForm onAddToy={handleAddToy} />
      <div className="toy-container">
        {toys.map((toy) => (
          <ToyCard key={toy.id} toy={toy} onDeleteToy={handleDeleteToy} onLikeToy={handleLikeToy} />
        ))}
      </div>
    </div>
  );
}

export default ToyContainer;

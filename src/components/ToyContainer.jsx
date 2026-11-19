
import React, { useEffect, useState } from "react";
import ToyCard from "./ToyCard";
import ToyForm from "./ToyForm";

function ToyContainer() {
  const [toys, setToys] = useState([]);

  // Fetch all toys
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(r => {
        if (!r.ok) {
          throw new Error("Cannot fetch toys");
        }
        return r.json();
      })
      .then(toys => setToys(toys))
      .catch(err => console.log(err));
  }, []);

  // Add a new toy
  function handleAddToy(newToy) {
    setToys(currentToys => [...currentToys, newToy]);
  }

  // Delete a toy
  function handleDonate(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
      .then(r => {
        if (!r.ok) {
          throw new Error("Could not delete toy");
        }

        setToys(currentToys =>
          currentToys.filter(toy => toy.id !== id)
        );
      })
      .catch(err => console.log(err));
  }

  // Increase a toy's likes
  function handleLike(id) {
    const toyToLike = toys.find(toy => toy.id === id);

    if (!toyToLike) return;

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: toyToLike.likes + 1
      })
    })
      .then(r => {
        if (!r.ok) {
          throw new Error("Could not update likes");
        }
        return r.json();
      })
      .then(updatedToy => {
        setToys(currentToys =>
          currentToys.map(toy =>
            toy.id === id ? updatedToy : toy
          )
        );
      })
      .catch(err => console.log(err));
  }

  return (
    <div id="toy-collection">
      <ToyForm onAddToy={handleAddToy} />

      {toys.map(toy => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onDonate={handleDonate}
          onLike={handleLike}
        />
      ))}
    </div>
  );
}

export default ToyContainer;

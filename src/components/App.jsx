
import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  async function handleAddToy(newToy) {
    const response = await fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    });

    const data = await response.json();

    setToys((currentToys) => [...currentToys, data]);
  }
  async function handleDonate(toyId) {
  const response = await fetch(`http://localhost:3001/toys/${toyId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    setToys((currentToys) =>
      currentToys.filter((toy) => toy.id !== toyId)
    );
  }
}
async function handleLike(toyId) {
  const toyToLike = toys.find((toy) => toy.id === toyId);

  const response = await fetch(`http://localhost:3001/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: toyToLike.likes + 1
    })
  });

  const updatedToy = await response.json();

  if (response.ok) {
    setToys((currentToys) =>
      currentToys.map((toy) =>
        toy.id === toyId ? updatedToy : toy
      )
    );
  }
}
  return (
    <>
      <Header />

      {showForm ? (
        <ToyForm onAddToy={handleAddToy} />
      ) : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

    <ToyContainer
  toys={toys}
  onDonate={handleDonate}
  onLike={handleLike}
/>
    </>
  );
}

export default App;


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
      .then((data) => setToys(data))
      .catch((error) => console.error("Error fetching toys:", error));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...newToy,
        likes: 0
      })
    })
      .then((response) => response.json())
      .then((toy) => {
        setToys((currentToys) => [...currentToys, toy]);
        setShowForm(false);
      })
      .catch((error) => console.error("Error adding toy:", error));
  }

  function handleLike(toyId) {
    const selectedToy = toys.find((toy) => toy.id === toyId);

    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: selectedToy.likes + 1
      })
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        setToys((currentToys) =>
          currentToys.map((toy) =>
            toy.id === toyId ? updatedToy : toy
          )
        );
      })
      .catch((error) => console.error("Error liking toy:", error));
  }

  function handleDonate(toyId) {
    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: "DELETE"
    })
      .then(() => {
        setToys((currentToys) =>
          currentToys.filter((toy) => toy.id !== toyId)
        );
      })
      .catch((error) => console.error("Error donating toy:", error));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onLike={handleLike}
        onDonate={handleDonate}
      />
    </>
  );
}

export default App;


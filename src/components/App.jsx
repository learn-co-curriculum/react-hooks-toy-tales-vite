import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Fetch all toys when the component first loads
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  // Toggle the toy form
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Add a new toy to the database
  function handleAddToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newToy,
        likes: 0,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add toy");
        }
        return response.json();
      })
      .then((toy) => {
        setToys((currentToys) => [...currentToys, toy]);
      })
      .catch((error) => console.error("Error adding toy:", error));
  }
// Delete a toy from the database
function handleDonate(id) {
  fetch(`http://localhost:3001/toys/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete toy");
      }

      setToys((currentToys) =>
        currentToys.filter((toy) => toy.id !== id)
      );
    })
    .catch((error) => console.error("Error deleting toy:", error));
}
  return (
    <>
      <Header />

      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer toys={toys} onDonate={handleDonate} />
    </>
  );
}

export default App;
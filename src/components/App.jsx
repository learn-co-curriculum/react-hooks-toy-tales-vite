import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Get all toys when the page loads
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => {
        setToys(data);
      });
  }, []);

  function handleClick() {
    setShowForm(!showForm);
  }

  // Add a new toy to the list
  function addToy(newToy) {
    setToys([...toys, newToy]);
  }

  // Remove a deleted toy from the list
  function deleteToy(id) {
    const updatedToys = toys.filter((toy) => toy.id !== id);
    setToys(updatedToys);
  }

  // Update a toy's likes in the list
  function updateToy(updatedToy) {
    const updatedToys = toys.map((toy) => {
      if (toy.id === updatedToy.id) {
        return updatedToy;
      } else {
        return toy;
      }
    });
    setToys(updatedToys);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        deleteToy={deleteToy}
        updateToy={updateToy}
      />
    </>
  );
}

export default App;
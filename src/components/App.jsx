import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Step 2: Fetch all toys on initial render
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error("Error fetching toys:", err));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Step 3: Add newly created toy to state
  function handleAddToy(newToy) {
    setToys((prevToys) => [...prevToys, newToy]);
  }

  // Step 4: Remove deleted toy from state
  function handleDeleteToy(deletedToyId) {
    setToys((prevToys) => prevToys.filter((toy) => toy.id !== deletedToyId));
  }

  // Step 5: Update liked toy in state while preserving array order
  function handleUpdateToy(updatedToy) {
    setToys((prevToys) =>
      prevToys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
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
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  );
}

export default App;

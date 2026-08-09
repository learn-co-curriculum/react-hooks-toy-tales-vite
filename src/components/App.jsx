import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]); // holds all toys fetched from the backend

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // GET all toys once when the app first mounts
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((toysData) => setToys(toysData));
  }, []);

  // Called by ToyForm after a successful POST — adds the new toy to state
  function handleAddNewToy(newToy) {
    setToys((toys) => [...toys, newToy]);
  }

  // Called by ToyCard after a successful DELETE — removes the toy from state
  function handleDeleteToy(toyId) {
    setToys((toys) => toys.filter((toy) => toy.id !== toyId));
  }

  // Called by ToyCard after a successful PATCH — updates just that toy's
  // likes in place, using .map() so the toy's position in the array (and
  // therefore on the page) doesn't change
  function handleUpdateToy(updatedToy) {
    setToys((toys) =>
      toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddNewToy={handleAddNewToy} /> : null}
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
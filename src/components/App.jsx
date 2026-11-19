import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

// Owns the toys state and every handler that changes it
function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // GET: fetch all toys once, when the page loads
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  // POST result: add the new toy (with its server-generated id) to state
  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
  }

  // DELETE result: keep every toy except the donated one
  function handleDonateToy(id) {
    setToys(toys.filter((toy) => toy.id !== id));
  }

  // PATCH result: swap in the updated toy, keeping the original order
  function handleUpdateToy(updatedToy) {
    setToys(toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy)));
  }

  function handleClick() {
    setShowForm((showForm) => !showForm);
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
        onDonateToy={handleDonateToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((toys) => setToys(toys));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addToy(newToy) {
    setToys((toys) => [...toys, newToy]);
  }

  function deleteToy(toyId) {
    setToys((toys) => toys.filter((toy) => toy.id !== toyId));
  }

  function updateLikes(toyId, newLikes) {
    setToys((toys) =>
      toys.map((toy) =>
        toy.id === toyId ? { ...toy, likes: newLikes } : toy
      )
    );
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
        updateLikes={updateLikes}
      />
    </>
  );
}

export default App;
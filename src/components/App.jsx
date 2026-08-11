import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]); // holds the array of toys fetched from the server

  useEffect(() => {
    // Empty dependency array = runs once, when App first mounts
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((toysData) => setToys(toysData)); // store fetched toys in state
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddNewToy(newToy) {
    // Inverse data flow: ToyForm calls this after a successful POST
    setToys((toys) => [...toys, newToy]);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddNewToy={handleAddNewToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} />
    </>
  );
}

export default App;
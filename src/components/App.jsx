import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const url = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function updateToy(updatedToy){
    setToys((toys) => toys.map((toy) => toy.id === updatedToy.id ? updatedToy : toy ));
  }

  function removeToy (id) {
    setToys((toys) => toys.filter((toy)=> toy.id !==id))
  }

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error("Failed to fetch", err));
  }, []);

  return (
    <>
      <Header />
      {showForm ? <ToyForm /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} updateToy={updateToy} removeToy={removeToy}/>
    </>
  );
}

export default App;

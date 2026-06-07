import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);
  useEffect(() =>{
    fetch("http://localhost:3001/toys")
    .then((res) => res.json())
    .then((data) => setToys(data));
  }, []);

  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
  };

  function handleDeleteToy(toyId) {
    setToys(toys.filter((toy) => toy.id !== toyId));
  };

  function handleUpdateToy(updatedToy) {
    setToys(toys.map(toy), (toy.id ===updatedToy.id ? updatedToy : toy));
  };

  function handleClick() {
    setShowForm((showForm) => !showForm);
  };

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={handleDeleteToy} onUpdateToy={handleUpdateToy} />
    </>
  );
};

export default App;

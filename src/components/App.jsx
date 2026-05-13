import React, { useEffect, useState } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys,setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));

  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // remove toy from state after deletion
function deleteToy(id) {
  const updatedToys = toys.filter((toy) => toy.id !== id);
  setToys(updatedToys);
}

// update a single toy in state
function updateToy(updatedToy) {
  const updatedToys = toys.map((toy) =>
    toy.id === updatedToy.id ? updatedToy : toy
  );

  setToys(updatedToys);
}

  return (
    <>
      <Header />
      {showForm ? <ToyForm /> : null}
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

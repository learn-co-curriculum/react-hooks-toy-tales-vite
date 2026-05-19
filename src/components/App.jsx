import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch toys: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setToys(data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    setToys((currentToys) => [...currentToys, newToy]);
  }

  function handleDeleteToy(deletedToyId) {
    fetch(`http://localhost:3000/toys/${deletedToyId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete toy: ${response.status}`);
        }
        setToys((currentToys) =>
          currentToys.filter((toy) => toy.id !== deletedToyId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={handleDeleteToy} />
    </>
  );
}

export default App;

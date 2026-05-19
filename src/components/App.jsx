import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addToy(toy) {
    const newToy = { ...toy, likes: 0 };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((createdToy) => {
        setToys((currentToys) => [...currentToys, createdToy]);
      });
  }

  function deleteToy(toyId) {
    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setToys((currentToys) =>
          currentToys.filter((toy) => toy.id !== toyId)
        );
      }
    });
  }

  function likeToy(updatedToy) {
    const likes = updatedToy.likes + 1;

    fetch(`http://localhost:3001/toys/${updatedToy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes }),
    })
      .then((response) => response.json())
      .then((returnedToy) => {
        setToys((currentToys) =>
          currentToys.map((toy) =>
            toy.id === returnedToy.id ? returnedToy : toy
          )
        );
      });
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onLikeToy={likeToy}
        onDeleteToy={deleteToy}
      />
    </>
  );
}

export default App;

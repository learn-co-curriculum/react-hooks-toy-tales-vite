import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
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

  function handleLikeToy(toyId, currentLikes) {
    const updatedLikes = currentLikes + 1;

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to update likes: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedToy) => {
        setToys((currentToys) =>
          currentToys.map((toy) =>
            toy.id === toyId ? updatedToy : toy
          )
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
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onLikeToy={handleLikeToy}
      />
    </>
  );
}

export default App;

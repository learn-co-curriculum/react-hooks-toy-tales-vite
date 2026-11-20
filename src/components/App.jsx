
import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data))
      .catch((error) => console.error(error));
  }, []);

  function handleClick() {
    setShowForm((currentShowForm) => !currentShowForm);
  }

  function handleAddToy(newToy) {
    setToys((currentToys) => [
      ...currentToys,
      newToy,
    ]);
  }

  async function handleLikeToy(toy) {
    try {
      const response = await fetch(
        `http://localhost:3001/toys/${toy.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            likes: toy.likes + 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update likes");
      }

      const updatedToy = await response.json();

      setToys((currentToys) =>
        currentToys.map((currentToy) =>
          currentToy.id === updatedToy.id
            ? updatedToy
            : currentToy
        )
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  }
function handleDeleteToy(toyToDelete) {
  fetch(`http://localhost:3001/toys/${toyToDelete.id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete toy");
      }

      setToys((currentToys) =>
        currentToys.filter((toy) => toy.id !== toyToDelete.id)
      );
    })
    .catch((error) => console.error(error));
}


async function handleDeleteToy(toy) {
  try {
    const response = await fetch(
      `http://localhost:3001/toys/${toy.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete toy");
    }

    setToys((currentToys) =>
      currentToys.filter(
        (currentToy) => currentToy.id !== toy.id
      )
    );
  } catch (error) {
    console.error("Error deleting toy:", error);
  }
}


  return (
    <>
      <Header />

      {showForm ? (
        <ToyForm onAddToy={handleAddToy} />
      ) : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>
          Add a Toy
        </button>
      </div>

<ToyContainer
  toys={toys}
  onLikeToy={handleLikeToy}
  onDeleteToy={handleDeleteToy}
/>
    </>
  );
}

export default App;

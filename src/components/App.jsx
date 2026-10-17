import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchToys() {
      try {
        const response = await fetch("http://localhost:3001/toys");
        if (!response.ok) {
          throw new Error("Unable to load toys.");
        }
        setToys(await response.json());
      } catch (fetchError) {
        setError(fetchError.message);
      }
    }

    fetchToys();
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  async function handleAddToy(toy) {
    try {
      const response = await fetch("http://localhost:3001/toys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...toy, likes: 0 }),
      });
      if (!response.ok) {
        throw new Error("Unable to create toy.");
      }
      const createdToy = await response.json();
      setToys((currentToys) => [
        ...currentToys,
        { ...createdToy, likes: createdToy.likes ?? 0 },
      ]);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleDonateToy(toyId) {
    try {
      const response = await fetch(`http://localhost:3001/toys/${toyId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Unable to donate toy.");
      }
      setToys((currentToys) => currentToys.filter((toy) => toy.id !== toyId));
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleLikeToy(toy) {
    const updatedLikes = toy.likes + 1;
    try {
      const response = await fetch(`http://localhost:3001/toys/${toy.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: updatedLikes }),
      });
      if (!response.ok) {
        throw new Error("Unable to like toy.");
      }
      const updatedToy = await response.json();
      setToys((currentToys) =>
        currentToys.map((currentToy) =>
          currentToy.id === toy.id ? { ...currentToy, ...updatedToy } : currentToy,
        ),
      );
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      {error ? <p role="alert">{error}</p> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onLikeToy={handleLikeToy}
        onDonateToy={handleDonateToy}
      />
    </>
  );
}

export default App;

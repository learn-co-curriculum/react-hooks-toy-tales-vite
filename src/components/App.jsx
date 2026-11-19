
import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_URL = "http://localhost:3002/toys";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // GET: Fetch all toys when the app first loads.
  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch toys");
        }
        return response.json();
      })
      .then((data) => setToys(data))
      .catch((error) => console.error("Error fetching toys:", error));
  }, []);

  // Show or hide the new toy form.
  function handleClick() {
    setShowForm((previousState) => !previousState);
  }

  // POST: Create a new toy.
  function handleAddToy(newToy) {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newToy,
        likes: 0,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not add toy");
        }
        return response.json();
      })
      .then((createdToy) => {
        setToys((previousToys) => [...previousToys, createdToy]);
        setShowForm(false);
      })
      .catch((error) => console.error("Error adding toy:", error));
  }

  // DELETE: Remove a toy from the collection.
  function handleDonateToy(id) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not donate toy");
        }
        setToys((previousToys) =>
          previousToys.filter((toy) => toy.id !== id)
        );
      })
      .catch((error) => console.error("Error donating toy:", error));
  }

  // PATCH: Increase a toy's likes by one.
  function handleLikeToy(toy) {
    const updatedLikes = toy.likes + 1;

    fetch(`${API_URL}/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: updatedLikes,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not update likes");
        }
        return response.json();
      })
      .then((updatedToy) => {
        setToys((previousToys) =>
          previousToys.map((currentToy) =>
            currentToy.id === updatedToy.id ? updatedToy : currentToy
          )
        );
      })
      .catch((error) => console.error("Error liking toy:", error));
  }

  return (
    <>
      <Header />

      {showForm && <ToyForm onAddToy={handleAddToy} />}

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

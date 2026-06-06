import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

/**
 * Main application component.
 * Fetches toys from the API and manages all toy state.
 */
function App() {

  // Stores the full list of toys fetched from the backend
  const [toys, setToys] = useState([])

  // Tracks whether the Add Toy section opened status 
  const [showForm, setShowForm] = useState(false);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((toyData) => setToys(toyData));
  }, []);

  /**
 * Adds a newly created toy to state.
 * @param {Object} newToy - Toy returned from the server.
 */
  function addToy(newToy) {
    setToys((currentToys) => [...currentToys, newToy])
  }

  /**
 * Removes a toy from the server and local state.
 * @param {number} id - ID of the toy to delete.
 */
  function deleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setToys((updatedToys) => {

          return updatedToys.filter((toy) => {
            return toy.id !== id
          })

        })
      })
      .catch((error) => {
        console.error("Failed to delete toy: ", error)
      })
  }

  /**
 * Updates a toy's likes on the server and in local state.
 * @param {number} id - ID of the toy being updated.
 * @param {number} newLikes - Updated like count.
 */
  function updateLikes(id, newLikes) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: newLikes,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((updatedToys) =>
        setToys((currentToys) => {

          return currentToys.map((toy) => {
            if (toy.id === updatedToys.id) {
              return updatedToys
            }
            else {
              return toy
            }
          })
        })
      )
      .catch((error) => {
        console.error("Failed to update toy likes: ", error)
      })
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy} updateLikes={updateLikes} />
    </>
  );
}

export default App;

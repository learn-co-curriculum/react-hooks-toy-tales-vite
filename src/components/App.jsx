import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  // State to toggle visibility of the new toy form
  const [showForm, setShowForm] = useState(false);
  // State to store the list of toys fetched from the backend
  const [toys, setToys] = useState([]);

  // Fetch all toys from the backend when the app first loads
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error("Error fetching toys:", err));
  }, []);

  // Toggle the display of the ToyForm component when button is clicked
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Callback function to add a newly created toy to the state
  function handleAddToy(newToy) {
    setToys((prevToys) => [...prevToys, newToy]);
  }

  // Render the application UI including Header, ToyForm (conditionally), and ToyContainer
  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} />
    </>
  );
}

export default App;
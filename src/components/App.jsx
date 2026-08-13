import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  // Stores all toys returned from the backend.
  const [toys, setToys] = useState([]);

  // Controls whether the add-toy form is visible.
  const [showForm, setShowForm] = useState(false);

  // Fetch all toys when the application first loads.
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />

      {showForm ? <ToyForm /> : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer toys={toys} />
    </>
  );
}

export default App;
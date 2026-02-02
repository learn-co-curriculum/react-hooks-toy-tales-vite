import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [fetchToy, setFetchToy] = useState([]);

  function loadToy() {
    fetch("http://localhost:3001/toys")
      .then(r => {
        if (!r.ok) { throw new Error("failed to fetch toy") }
        return r.json()
      })
      .then(data => setFetchToy(data))
      .catch(error => console.log(error))
  }
  useEffect(() => { loadToy(); }, [])

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
      <ToyContainer toys={fetchToy} />
    </>
  );
}

export default App;

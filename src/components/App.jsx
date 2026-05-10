import React, { useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";
import { useToys } from "../hooks/useToys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const { toys, isLoading, error, addToy, likeToy, donateToy } = useToys();

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      {error ? <p className="status-message">{error}</p> : null}
      {isLoading ? (
        <p className="status-message">Loading toys...</p>
      ) : (
        <ToyContainer toys={toys} onLikeToy={likeToy} onDonateToy={donateToy} />
      )}
    </>
  );
}

export default App;

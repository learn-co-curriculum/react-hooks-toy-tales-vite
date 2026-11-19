
import React, { useState } from "react";

import Header from "./Header";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);

  function handleClick() {
    setShowForm(showForm => !showForm);
  }

  return (
    <>
      <Header />

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer showForm={showForm} />
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const [toys, setToys] = useState([])

  useEffect(()=>{
    fetch(`http://localhost:4000/toys`)
    .then(res =>res.json())
    .then((data) =>{
      console.log(data)
      setToys(data)
    })
  }, [])

  return (
    <>
      <Header />
      {showForm ? <ToyForm /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
        toys={toys}
      />
    </>
  );
}

export default App;

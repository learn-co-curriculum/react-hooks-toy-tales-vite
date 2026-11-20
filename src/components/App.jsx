import React, { useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Fetch all toys once when the component mounts
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch toys");
        return res.json();
      })
      .then((data) => setToys(data))
      .catch((err) => console.error(err));
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

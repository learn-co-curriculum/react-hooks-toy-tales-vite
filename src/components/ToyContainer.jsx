import React, { useState, useEffect } from "react";
import ToyCard from "./ToyCard"
import ToyForm from "./ToyForm"

function ToyContainer() {
  
// Implement state, fetch, and useEffect to get all toys on page load
const [toys, setToys] = useState([])

useEffect(() => {
  fetch('http://localhost:3001/toys')
  .then((response) => response.json())
  .then((data) => setToys(data))
  .catch((error) => console.error('Error fetching toys:', error))
}, [])

  return (
    <div>
      <ToyForm setToys={setToys} />

      <div id="toy-collection">

        {/* Render the collection of ToyCards */}
        {toys.map((toy) => (
          <ToyCard key={toy.id} toy={toy} />
        ))}

      </div>
    </div>
  );
}

export default ToyContainer;

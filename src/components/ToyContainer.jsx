import React, { useEffect, useState } from "react";
import ToyCard from "./ToyCard";

function ToyContainer() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch toys: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setToys(data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} />
      ))}
    </div>
  );
}

export default ToyContainer;

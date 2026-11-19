import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDonate }) {
  return (
    <div className="toy-container">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onDonate={onDonate}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
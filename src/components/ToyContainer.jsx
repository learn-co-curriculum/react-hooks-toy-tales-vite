import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDonate }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard key={toy.id} {...toy} onDonate={onDonate} />
      ))}
    </div>
  );
}

export default ToyContainer;

import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onLikeToy, onDonateToy }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onLike={() => onLikeToy(toy)}
          onDonate={() => onDonateToy(toy.id)}
        />
      ))}
    </div>
  );
}

export default ToyContainer;

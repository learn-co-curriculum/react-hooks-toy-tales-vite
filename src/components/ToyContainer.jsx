import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onLikeToy, onDeleteToy }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onLike={() => onLikeToy(toy)}
          onDelete={() => onDeleteToy(toy.id)}
        />
      ))}
    </div>
  );
}

export default ToyContainer;

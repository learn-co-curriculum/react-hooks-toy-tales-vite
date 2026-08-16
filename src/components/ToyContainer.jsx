import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDonate, onUpdateLikes }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onDonate={onDonate}
          onUpdateLikes={onUpdateLikes}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
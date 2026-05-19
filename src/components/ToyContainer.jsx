import React from "react";
import ToyCard from "./ToyCard";

// ToyContainer receives the full toys list and both handlers from App.
// It maps each toy to a ToyCard — no state lives here.
function ToyContainer({ toys, onLike, onDelete }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onLike={onLike}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ToyContainer;

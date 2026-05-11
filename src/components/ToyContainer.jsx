import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, deleteToy, updateToyLikes }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} deleteToy={deleteToy} updateToyLikes={updateToyLikes} />
      ))}
    </div>
  );
}

export default ToyContainer;

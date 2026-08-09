import React from "react";
import ToyCard from "./ToyCard";

// Receives the full toy list from App and passes each individual
// toy (plus the shared callbacks) down to a ToyCard
function ToyContainer({ toys, onDeleteToy, onUpdateToy }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onDeleteToy={onDeleteToy}
          onUpdateToy={onUpdateToy}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
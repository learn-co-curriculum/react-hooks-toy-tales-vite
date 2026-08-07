import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onUpdateToyLikes, onDeleteToy }) {
  const toyList = toys.map((toy) => (
    <ToyCard
      key={toy.id}
      toy={toy}
      onUpdateToyLikes={onUpdateToyLikes}
      onDeleteToy={onDeleteToy}
    />
  ));

  return <div id="toy-collection">{toyList}</div>;
}

export default ToyContainer;
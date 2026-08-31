import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, updateToy, removeToy}) {
  return (
    <div id="toy-collection">{toys.map((toy)=> (
      <ToyCard
      key={toy.id}
      toy={toy}
      updateToy={updateToy}
      removeToy={removeToy}
      />
    ))}</div>
  );
}

export default ToyContainer;

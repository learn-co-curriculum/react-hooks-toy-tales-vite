import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          name={toy.name}
          image={toy.image}
          likes={toy.likes}
        />
      ))}
    </div>
  );
}

export default ToyContainer;

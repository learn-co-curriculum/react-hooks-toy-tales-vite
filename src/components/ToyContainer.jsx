import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys}) {
  return (
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
      {toys ? toys.map(toy => (
        <ToyCard
          key={toy.id}
          {...toy}
        />
      )) : 
        <p>Loading</p>     
      }
    </div>
  );
}

export default ToyContainer;

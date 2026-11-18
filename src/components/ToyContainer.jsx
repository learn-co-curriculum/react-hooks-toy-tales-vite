import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer(props) {
  return (
    <div id="toy-collection">
      {props.toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          deleteToy={props.deleteToy}
          updateToy={props.updateToy}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
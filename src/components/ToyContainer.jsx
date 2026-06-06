import React from "react";
import ToyCard from "./ToyCard";

/**
 * Renders the collection of toy cards.
 * @param {Array} toys - Array of toy objects.
 */
function ToyContainer({ id, toys, deleteToy, updateLikes }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          id={toy.id}
          name={toy.name}
          image={toy.image}
          likes={toy.likes}
          deleteToy={deleteToy}
          updateLikes={updateLikes} />
      )
      )
      }

    </div>
  );
}

export default ToyContainer;
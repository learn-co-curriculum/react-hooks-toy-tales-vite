import React from "react";
import ToyCard from "./ToyCard";

/**
 * ToyContainer Component
 * 
 * Container component responsible for rendering a collection of ToyCard components
 * Responsibilities:
 * - Iterate through toys array and render individual ToyCard components
 * - Pass toy data and callback functions to each ToyCard
 * 
 * Props:
 * @param {Array} toys - Array of toy objects to display
 * @param {Function} onDeleteToy - Callback to handle toy deletion
 * @param {Function} onLikeToy - Callback to handle toy likes update
 */
function ToyContainer({ toys, onDeleteToy, onLikeToy }) {
  return (
    <div id="toy-collection">
      {/* Render each toy as a ToyCard component */}
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onDeleteToy={onDeleteToy}
          onLikeToy={onLikeToy}
        />
      ))}
    </div>
  );
}

export default ToyContainer;

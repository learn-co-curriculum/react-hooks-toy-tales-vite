// ToyContainer.jsx
// This component receives a list of toys via props and renders a ToyCard for each one
import React from "react";
import ToyCard from "./ToyCard";

// Functional component that receives 'toys' as a prop from the parent
function ToyContainer({ toys }) {
  return (
    <div id="toy-collection">
        {/* Map through the array of toys and render a ToyCard for each toy */}
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} />
      ))}
    </div>
  );
}


export default ToyContainer;
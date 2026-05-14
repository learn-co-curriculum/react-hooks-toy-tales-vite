// import React from "react";
// import ToyCard from "./ToyCard";

// function ToyContainer() {
//   return (
//     <div id="toy-collection">{/* Render the collection of ToyCards */}</div>
//   );
// }

// export default ToyContainer;

import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onUpdateToy, onDeleteToy }) {
  return (
    <div id="toy-collection">
      {toys.map(toy => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onUpdateToy={onUpdateToy}
          onDeleteToy={onDeleteToy}
        />
      ))}
    </div>
  );
}

export default ToyContainer;

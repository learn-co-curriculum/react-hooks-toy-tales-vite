
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDeleteToy }) {

  return (
    <div id="toy-collection">{/* Render the collection of ToyCards */}
      {toys.map(toy => <ToyCard
        key={toy.id}
        toy={toy}
        onDeleteToy={onDeleteToy}
      />
      )}
    </div>
  )
}

export default ToyContainer;

import ToyCard from "./ToyCard";

function ToyContainer({
  toys,
  onLikeToy,
  onDeleteToy,
}) {
  return (
    <div className="toy-container">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onLikeToy={onLikeToy}
          onDeleteToy={onDeleteToy}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
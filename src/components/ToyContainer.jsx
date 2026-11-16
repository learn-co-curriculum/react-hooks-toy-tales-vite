function ToyContainer({ toys, onDeleteToy }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} onDeleteToy={onDeleteToy} />
      ))}
    </div>
  );
}
function ToyCard({ toy, onLikeToy, onDeleteToy }) {
  return (
    <div data-testid="toy-card">
      <h2>{toy.name}</h2>

      <img src={toy.image} alt={toy.name} />

      <p>{toy.likes} Likes </p>

      <button onClick={() => onLikeToy(toy.id)}>
       Like {"<3"}
      </button>

      <button onClick={() => onDeleteToy(toy.id)}>
       Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
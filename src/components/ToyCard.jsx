function ToyCard({ toy, onLikeToy, onDeleteToy }) {
  return (
    <div className="card" data-testid="toy-card">
      <img src={toy.image} alt={toy.name} />

      <h2>{toy.name}</h2>

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
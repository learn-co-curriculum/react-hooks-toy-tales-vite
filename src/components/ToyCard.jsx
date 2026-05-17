function ToyCard({ toy, onDeleteToy }) {
  function handleDonate() {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "DELETE",
    }).then(() => onDeleteToy(toy.id));
  }

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes</p>
      <button>Like</button>
      <button onClick={handleDonate}>Donate</button>
    </div>
  );
}

export default ToyCard;
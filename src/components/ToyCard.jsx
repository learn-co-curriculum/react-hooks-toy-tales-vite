function ToyCard({ toy, onDeleteToy, onUpdateToy }) {
  function handleDonate() {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "DELETE",
    }).then(() => onDeleteToy(toy.id));
  }

  function handleLike() {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: toy.likes + 1,
      }),
    })
      .then((res) => res.json())
      .then((updatedToy) => onUpdateToy(updatedToy));
  }

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes</p>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDonate}>Donate</button>
    </div>
  );
}

export default ToyCard;
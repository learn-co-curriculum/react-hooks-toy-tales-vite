function ToyCard({ toy, onDeleteToy }) {
  const { id, name, image, likes } = toy;

  function handleDelete() {
    fetch(`http://localhost:3001/toys/${id}`, { method: "DELETE" }).then(() =>
      onDeleteToy(id) // only update state after the server confirms
    );
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn">Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}
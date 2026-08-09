import React from "react";

function ToyCard({ toy, onDeleteToy, onLikeToy }) {
  function handleDelete() {
    onDeleteToy(toy.id);
  }

  function handleLike() {
    onLikeToy(toy);
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>

      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />

      <p>{toy.likes} Likes </p>

      <button onClick={handleLike}>Like &lt;3</button>

      <button onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
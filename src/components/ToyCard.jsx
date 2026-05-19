import React from "react";

function ToyCard({ toy, onLike, onDelete }) {
  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={onLike}>
        Like
      </button>
      <button className="delete-btn" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}

export default ToyCard;

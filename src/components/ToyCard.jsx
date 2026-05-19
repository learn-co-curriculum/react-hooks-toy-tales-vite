import React from "react";

function ToyCard({ toy, onDeleteToy }) {
  const { name, image, likes } = toy;

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn">Like {"<3"}</button>
      <button
        className="del-btn"
        onClick={() => onDeleteToy(toy.id)}
      >
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;

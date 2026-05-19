import React from "react";

// ToyCard receives a single toy object plus onLike and onDelete handlers.
// Clicking Like fires a PATCH; clicking Donate fires a DELETE — both via App.
function ToyCard({ toy, onLike, onDelete }) {
  const { id, name, image, likes } = toy;

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>

      {/* Pass the full toy object so App can read current likes for PATCH */}
      <button className="like-btn" onClick={() => onLike(toy)}>
        Like {"<3"}
      </button>

      {/* Pass only the id — that's all DELETE needs */}
      <button className="del-btn" onClick={() => onDelete(id)}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;

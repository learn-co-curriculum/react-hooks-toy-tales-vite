import React from "react";

function ToyCard({ toy, onLike, onDelete}) {

    return (
    <div className="toy-card" data-testid="toy-card">
      <h2>{toy.name}</h2>
 
      <img
        src={toy.image}
        alt={toy.name}
        onError={(e) => {
          // fallback if image URL is broken
          e.target.src =
            "https://via.placeholder.com/200x200?text=No+Image";
        }}
      />
 
      <p className="likes-count">{toy.likes} Likes </p>
 
      {/* PATCH */}
      <button className="like-btn" onClick={() => onLike(toy)}>
        Like {"<3"}
      </button>
 
      {/* DELETE */}
      <button className="donate-btn" onClick={() => onDelete(toy.id)}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard; 

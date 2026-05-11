import React from "react";

function ToyCard({ toy, onUpdateToy }) {

  const handleLike = () => {
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
      .then((updatedToy) => {
        onUpdateToy(updatedToy);
      });
  };

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>

      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />

      <p>{toy.likes} Likes </p>

      <button onClick={handleLike} className="like-btn">
        Like {"<3"}
      </button>

      <button className="del-btn">
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
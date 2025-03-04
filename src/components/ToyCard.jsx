import React from "react";

function ToyCard() {
  return (
    <div className="card" data-testid="toy-card">
      <h2>{"" /* Toy's Name */}</h2>
      <img
        src={"" /* Toy's Image */}
        alt={"" /* Toy's Name */}
        className="toy-avatar"
      />
      <p>{"" /* Toy's Likes */} Likes </p>
      <button className="like-btn">Like {"<3"}</button>
      <button className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;

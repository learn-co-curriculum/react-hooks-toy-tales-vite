import React from "react";

function ToyCard({ id, name, image, likes, onDonate }) {
  function handleOnDonate(e) {
    donateToy();
  }

  //delet toy from api
  async function donateToy() {
    try {
      const res = await fetch(`http://localhost:3001/toys/${parseInt(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("failed to delete toy");
      }
      onDonate((prev) => prev.filter((toy) => toy.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn">Like {"<3"}</button>
      <button className="del-btn" onClick={handleOnDonate}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;

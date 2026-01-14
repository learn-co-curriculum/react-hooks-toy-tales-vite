import React from "react";

function handleImageError(e) {
  e.target.src = "/placeholder.png";
}

function ToyCard({ toy, onDeleteToy }) {
  function handleDonateClick() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to delete toy");
        // json-server often returns empty body on DELETE, so no r.json()
        onDeleteToy(toy.id);
      })
      .catch((err) => console.log(err));
  }

return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
      <button className="like-btn">Like {"<3"}</button>

      <button className="del-btn" onClick={handleDonateClick}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
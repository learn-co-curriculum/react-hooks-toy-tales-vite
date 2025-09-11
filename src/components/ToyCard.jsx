import React from "react";

// ToyCard receives a single toy object as a prop
function ToyCard({ toy }) {
  return (
    // Each toy is displayed in a card div with a data-testid for testing
    <div className="card" data-testid="toy-card">
      {/* Display the toy's name */}
      <h2>{toy.name}</h2>

      {/* Display the toy's image with an alt text */}
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />

      {/* Display the number of likes */}
      <p>{toy.likes} Likes </p>

      {/* Button to like the toy */}
      <button className="like-btn">Like {"<3"}</button>

      {/* Button to donate (delete) the toy */}
      <button className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
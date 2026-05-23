import React from "react";

/**
 * ToyCard Component
 * 
 * Displays a single toy card with its details and action buttons
 * Responsibilities:
 * - Render toy information (name, image, likes count)
 * - Handle like button click to increase toy's likes via PATCH request
 * - Handle donate button click to delete toy via DELETE request
 * - Update parent component state through callback props
 * 
 * Props:
 * @param {Object} toy - Toy object containing id, name, image, and likes
 * @param {Function} onDeleteToy - Callback function to handle toy deletion
 * @param {Function} onLikeToy - Callback function to handle toy like updates
 */
function ToyCard({ toy, onDeleteToy, onLikeToy }) {
  /**
   * Handle like button click
   * Makes a PATCH request to increment the toy's likes by 1
   * Updates parent state with the response from backend
   */
  function handleLike() {
    const updatedToy = { ...toy, likes: toy.likes + 1 };
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedToy),
    })
      .then((response) => response.json())
      .then((data) => onLikeToy(data));
  }

  /**
   * Handle donate button click
   * Makes a DELETE request to remove the toy from the backend
   * Updates parent state by calling onDeleteToy callback if successful
   */
  function handleDelete() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          onDeleteToy(toy.id);
        }
      });
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
      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;

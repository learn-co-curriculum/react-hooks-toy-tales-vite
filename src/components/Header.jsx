import React from "react";

function Header({showForm, setShowForm}) {
  return (

    <header className="app-header">
      <h1>🧸 Andy's Toy Chest</h1>
      <button
        className="toggle-form-btn"
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "✕ Close" : "Add a Toy"}
      </button>
    </header>
  );
}

export default Header;

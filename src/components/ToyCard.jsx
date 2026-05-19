// ToyCard.jsx

function ToyCard({ toy, onDeleteToy, onLikeToy }) {
  return (
    <div className="card">
      <h2>{toy.name}</h2>

      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />

      <p>{toy.likes} Likes</p>

      <button onClick={() => onLikeToy(toy)}>
        Like ❤️
      </button>

      <button onClick={() => onDeleteToy(toy.id)}>
        Donate
      </button>
    </div>
  )
}

export default ToyCard
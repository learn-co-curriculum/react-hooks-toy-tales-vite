function ToyCard({ toy }) {
  return (
    <div className="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} />
      <p>Likes: {toy.likes}</p>
    </div>
  )
}

export default ToyCard
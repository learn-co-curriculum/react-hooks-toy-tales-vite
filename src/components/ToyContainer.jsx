import ToyCard from "./ToyCard"
function ToyContainer({ toys, setToys,deleteToy, updateLikes }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
         key={toy.id}
          toy={toy} 
          setToys={setToys}
          deleteToy={deleteToy} 
          updateLikes={updateLikes}/>
      ))}
    </div>
  );
}
export default ToyContainer
import { useState, useEffect } from "react";
import ToyCard from "./ToyCard";

function ToyContainer() {

  const [toys, setToys] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchToys()
  }, [])


  function fetchToys() {
    //console.log('Fetching')
    setLoading(true)
    fetch("http://localhost:3001/toys")
      .then(response => response.json())
      .then(data => showToys(data))
      .catch((err) => console.error(err))
  }


  function showToys(data) {
    setLoading(false)
    setToys([...data])
  }

  const contentView = (
    <div id="toy-collection">{/* Render the collection of ToyCards */}
      {toys.map(toy => <ToyCard
        key={toy.id}
        toy={toy}
      />
      )}
    </div>
  )

  const loadingView = (
    <p>Loading...</p>
  )

  return (
   loading  ? loadingView : contentView
  );
}

export default ToyContainer;

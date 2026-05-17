import { useEffect, useState } from "react";
import ToyCard from "./ToyCard";

function App() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  return (
    <main>
      <h1>Toy Tales</h1>

      <div id="toy-collection">
        {toys.map((toy) => (
          <ToyCard key={toy.id} toy={toy} />
        ))}
      </div>
    </main>
  );
}

export default App;

import { useEffect, useState } from "react";
import {
  createToy,
  deleteToy,
  getToys,
  updateToyLikes,
} from "../services/toysApi";

function normalizeToy(toy) {
  return {
    likes: 0,
    ...toy,
  };
}

export function useToys() {
  const [toys, setToys] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getToys()
      .then((toysFromServer) => {
        if (isMounted) {
          setToys(toysFromServer.map(normalizeToy));
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function addToy(toy) {
    const newToy = normalizeToy(toy);

    return createToy(newToy).then((createdToy) => {
      const savedToy = normalizeToy(createdToy);
      setToys((currentToys) => [...currentToys, savedToy]);
      return savedToy;
    });
  }

  function likeToy(toy) {
    const nextLikes = toy.likes + 1;

    return updateToyLikes(toy.id, nextLikes).then((updatedToy) => {
      const savedToy = normalizeToy(updatedToy);
      setToys((currentToys) =>
        currentToys.map((currentToy) =>
          currentToy.id === savedToy.id ? savedToy : currentToy,
        ),
      );
      return savedToy;
    });
  }

  function donateToy(id) {
    return deleteToy(id).then(() => {
      setToys((currentToys) =>
        currentToys.filter((currentToy) => currentToy.id !== id),
      );
    });
  }

  return {
    toys,
    isLoading,
    error,
    addToy,
    likeToy,
    donateToy,
  };
}

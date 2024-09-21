import { useState, useEffect } from "react";
import "./App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function App() {
  const [data, setData] = useState(null);
  const [pokeData, setPokeData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await response.json();
      setData(data);
      console.log(data.results);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const getPokeData = async () => {
        const promises = data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const details = await response.json();
          return { name: pokemon.name, details };
        });

        const results = await Promise.all(promises);

        const newPokeData = {};
        results.forEach((pokemon) => {
          newPokeData[pokemon.name] = pokemon.details;
        });
        setPokeData(newPokeData);
        console.log(pokeData);
      };

      getPokeData();
    }
  }, [data]);

  useEffect(() => {
    console.log(pokeData.charmander); // This will log the updated pokeData state correctly
  }, [pokeData]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div id="grid-holder">
      {data.results.map((pokemon, index) => {
        const details = pokeData[pokemon.name];
        return (
          <Card key={index}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            <CardContent>
              {details ? (
                <>
                  <p>ID: {details.id}</p>
                  <p>Height: {details.height}</p>
                  <p>Weight: {details.weight}</p>
                  <img src={details.sprites.front_shiny} alt={pokemon.name} />
                </>
              ) : (
                <p>Loading details...</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default App;

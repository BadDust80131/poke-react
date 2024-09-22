import { useState, useEffect } from "react";
import "./App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ pokemon, details }) => {
  PokemonCard.propTypes = {
    pokemon: PropTypes.object,
    details: PropTypes.object,
  };
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardActionArea onClick={() => navigate("/pokemon/" + details.id)}>
        <Link to="pokemon">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Link>
        <CardMedia
          component="img"
          image={
            isHovered
              ? details.sprites.front_shiny
              : details.sprites.front_default
          }
          alt={pokemon.name}
        ></CardMedia>
        <CardContent>
          {details ? (
            <>
              <p>ID: {details.id}</p>
              <p>Height: {Math.round(details.height * 3.937)} in</p>
              <p>Weight: {Math.round(details.weight / 4.536)} lb</p>
            </>
          ) : (
            <p>Loading details...</p>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

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
      };

      getPokeData();
    }
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div id="grid-holder">
      {data.results.map((pokemon, index) => {
        const details = pokeData[pokemon.name];

        if (!details) {
          return <div key={Math.random()}>Loading...</div>;
        }
        return (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            details={details}
          ></PokemonCard>
        );
      })}
    </div>
  );
}

export default App;

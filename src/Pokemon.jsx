import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Pokemon = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (parseInt(name) < 1 || parseInt(name) > 151) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, [name]);

  if (!data) {
    return <div>Loading...</div>;
  }

  function navigateBack() {
    if (parseInt(name) > 1) {
      navigate("/pokemon/" + (parseInt(name) - 1));
    }
  }

  function navigateForward() {
    if (parseInt(name) < 151) {
      navigate("/pokemon/" + (parseInt(name) + 1));
    }
  }

  return (
    <div>
      <button onClick={navigateBack}>Back</button>{" "}
      <button onClick={() => navigate("/")}>Home</button>{" "}
      <button onClick={navigateForward}>Next</button>
      <h1>{data.name.toUpperCase()}</h1>
      <img src={data.sprites.front_default} alt={data.name} />
      <p>
        <strong>ID:</strong> {data.id}
      </p>
      <p>
        <strong>Base Experience:</strong> {data.base_experience}
      </p>
      <p>
        <strong>Height:</strong> {data.height}
      </p>
      <p>
        <strong>Weight:</strong> {data.weight}
      </p>
      <h2>Abilities</h2>
      <ul>
        {data.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name.toUpperCase()}</li>
        ))}
      </ul>
      <h2>Types</h2>
      <ul>
        {data.types.map((type, index) => (
          <li key={index}>{type.type.name.toUpperCase()}</li>
        ))}
      </ul>
      <h2>Base Stats</h2>
      <ul>
        {data.stats.map((stat, index) => (
          <li key={index}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      <h2>Cries</h2>
      <p>
        <strong>Latest:</strong> <a href={data.cries.latest}>Download</a>
        <br />
        <strong>Legacy:</strong> <a href={data.cries.legacy}>Download</a>
      </p>
      <h2>Sprites</h2>
      <img src={data.sprites.back_default} alt={`${data.name} back`} />
      <img src={data.sprites.front_shiny} alt={`${data.name} shiny front`} />
      <img src={data.sprites.back_shiny} alt={`${data.name} shiny back`} />
    </div>
  );
};

export default Pokemon;

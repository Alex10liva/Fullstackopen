import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const SingleCountry = (props) => {
  const languageKeys = Object.keys(props.languages);

  return (
    <div>
      <h2>{props.name}</h2>
      <div>
        Capital: {props.capital}
        <br />
        Population: {props.population}
      </div>
      <h3>Languages</h3>
      <ul>
        {languageKeys.map((key) => (
          <li key={key}>{props.languages[key]}</li>
        ))}
      </ul>
      <img src={props.flag.png} alt={props.flag.alt} />
    </div>
  );
};

function App() {
  const endpoint =
    "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,languages";

  const [countries, setCountry] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get(endpoint).then((response) => {
      setCountry(response.data);
    });
  }, []);

  const handleSearchFilter = (event) => {
    setFilter(event.target.value);
  };

  const filterByName = countries.filter((country) => {
    if (filter !== "")
      return country.name.common.toLowerCase().includes(filter.toLowerCase());
    else return null;
  });

  return (
    <div>
      <h1>Countries finder</h1>
      <div className="initial-input">
        {selectedCountry ? (
          <button onClick={() => setSelectedCountry(null)}>Go back</button>
        ) : (
          <div>
            Start typing the name of the country:{" "}
            <input id="search" value={filter} onChange={handleSearchFilter} />
          </div>
        )}
      </div>
      <div>
        {filterByName.length === 1 ? (
          filterByName.map((country) => (
            <SingleCountry
              key={country.name.common}
              name={country.name.common}
              capital={country.capital}
              population={country.population}
              languages={country.languages}
              flag={country.flags}
            />
          ))
        ) : selectedCountry ? (
          <div>
            <SingleCountry
              name={selectedCountry.name.common}
              capital={selectedCountry.capital}
              population={selectedCountry.population}
              languages={selectedCountry.languages}
              flag={selectedCountry.flags}
            />
          </div>
        ) : filterByName.length <= 10 ? (
          filterByName.map((country) => (
            <div key={country.name.common}>
              {country.name.common} {""}
              <button onClick={() => setSelectedCountry(country)}>show</button>
              <br />
            </div>
          ))
        ) : (
          <p>Too many matches, specify another filter</p>
        )}
      </div>
    </div>
  );
}

export default App;

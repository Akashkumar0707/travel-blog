import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryInfo = ({ countryName }) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${countryName}`
        );
        setCountry(response.data[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryName]);

  if (loading) return <div>Loading country info...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!country) return <div>No country data found</div>;

  return (
    <div className="country-info">
      <h3>{country.name.common}</h3>
      <img src={country.flags.png} alt={`${country.name.common} flag`} width="100" />
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Languages: {Object.values(country.languages).join(', ')}</p>
    </div>
  );
};

export default CountryInfo;
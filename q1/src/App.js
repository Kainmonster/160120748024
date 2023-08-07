import React, { useState } from 'react';
import axios from 'axios';

// Set the base URL for the API
const apiBaseUrl = 'http://localhost:8008';

const NumberManagementApp = () => {
  const [urls, setUrls] = useState('');
  const [numbers, setNumbers] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`${apiBaseUrl}/numbers${buildQueryString()}`);
      setNumbers(response.data.numbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
      console.error('AxiosError Details:', error.toJSON());
      setNumbers([]);
    }
  };

  const buildQueryString = () => {
    if (!urls) return '';

    const urlArray = urls.split('\n').filter((url) => url.trim() !== '');
    return '?' + urlArray.map((url) => `url=${encodeURIComponent(url)}`).join('&');
  };

  return (
    <div>
      <h1 className='header'>Number Management App</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="urls">Enter URLs:</label>
        <br/>
        <textarea
          id="urls"
          name="urls"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
        />
        <button type="submit">Fetch Numbers</button>
      </form>
      <h2>Unique Numbers are:</h2>
      <ul>
        {numbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default NumberManagementApp;

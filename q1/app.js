const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8008;

// Function to fetch numbers from a given URL
async function fetchNumbersFromURL(url) {
  try {
    const response = await axios.get(url, { timeout: 500 }); // Set the timeout to 500 milliseconds
    return response.data.numbers;
  } catch (error) {
    console.error(`Error fetching numbers from URL ${url}: ${error.message}`);
    return [];
  }
}

// GET route handler for /numbers
app.get('/numbers', async (req, res) => {
  const urls = req.query.url;
  if (!urls) {
    return res.status(400).json({ error: 'URLs are missing in the query parameters.' });
  }

  // Ensure urls is an array, even if there is only one URL
  const urlArray = Array.isArray(urls) ? urls : [urls];

  try {
    const allNumbers = new Set(); // Use a Set to store unique numbers

    // Fetch numbers from each URL concurrently
    const promises = urlArray.map(fetchNumbersFromURL);
    const results = await Promise.all(promises);

    // Merge the numbers arrays and add to the Set to ensure uniqueness
    results.forEach((numbers) => {
      numbers.forEach((num) => allNumbers.add(num));
    });

    // Sort the unique merged numbers in ascending order
    const uniqueNumbers = Array.from(allNumbers).sort((a, b) => a - b);

    res.json({ numbers: uniqueNumbers });
  } catch (error) {
    console.error('Error while processing URLs:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import React, { useEffect, useState } from 'react';
import { fetchTrains , registerApp , authenticateApp } from '../api';

const AllTrainsPage = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const accessToken = await registerApp();
      if (accessToken) {
        const authToken = await authenticateApp(accessToken);
        if (authToken) {
          const trainsData = await fetchTrains(authToken);
          setTrains(trainsData);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>All Trains</h1>
      {trains.map((train) => (
        <div key={train.id}>
          <h3>{train.name}</h3>

        </div>
      ))}
    </div>
  );
};

export default AllTrainsPage;
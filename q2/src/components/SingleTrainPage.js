import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTrains , registerApp , authenticateApp } from '../api';

const SingleTrainPage = () => {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const accessToken = await registerApp();
      if (accessToken) {
        const authToken = await authenticateApp(accessToken);
        if (authToken) {
          const trainsData = await fetchTrains(authToken);
          const selectedTrain = trainsData.find((t) => t.id === Number(trainId));
          setTrain(selectedTrain);
        }
      }
    }
    fetchData();
  }, [trainId]);

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Single Train</h1>
      <h3>{train.name}</h3>
      {/* Display other train information */}
    </div>
  );
};

export default SingleTrainPage;
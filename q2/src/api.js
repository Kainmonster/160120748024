import axios from 'axios';

const API_BASE_URL = 'http://20.244.56.144/train';
const ACCESS_KEY = 'rdxwKw';

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Access-Key': ACCESS_KEY,
  },
});

export const registerApp = async () => {
  try {
    const response = await instance.post('/register');
    return response.data.accessToken;
  } catch (error) {
    console.error('Error registering app:', error);
    return null;
  }
};

export const authenticateApp = async (accessToken) => {
  try {
    const response = await instance.post('/auth', { accessToken });
    return response.data.authToken;
  } catch (error) {
    console.error('Error authenticating app:', error);
    return null;
  }
};

export const fetchTrains = async (authToken) => {
  try {
    const response = await instance.get('/trains', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching train data:', error);
    return [];
  }
};
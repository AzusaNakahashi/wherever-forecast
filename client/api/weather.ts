import axios from "axios";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const fetchCity = async (coordinates) => {
  const param = `${coordinates.lat},${coordinates.lng}`;
  const { data } = await axios.get(`${SERVER_URL}/city/${param}`);
  return data;
};

const fetcthDailyForecasts = async (city) => {
  const cityKey = city.Key;
  const { data } = await axios.get(`${SERVER_URL}/weather/daily/${cityKey}`);
  return data;
};

const fetchCurrentWeather = async (city) => {
  const cityKey = city.Key;
  const { data } = await axios.get(`${SERVER_URL}/weather/current/${cityKey}`);
  return data;
};

const fetchHourlyForcasts = async (city) => {
  const cityKey = city.Key;
  const { data } = await axios.get(`${SERVER_URL}/weather/hourly/${cityKey}`);
  return data;
};

export {
  fetchCity,
  fetcthDailyForecasts,
  fetchCurrentWeather,
  fetchHourlyForcasts,
};

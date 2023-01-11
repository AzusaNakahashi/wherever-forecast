import axios from "axios";
import type { Coordinates } from "../types/mapType";
import type { City } from "../types/city";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const fetchCity = async (coordinates: Coordinates) => {
  try {
    const param = `${coordinates.lat},${coordinates.lng}`;
    const res = await axios.get(`${SERVER_URL}/city/${param}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const fetcthDailyForecasts = async (city: City) => {
  try {
    const cityKey = city.Key;
    const res = await axios.get(`${SERVER_URL}/weather/daily/${cityKey}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const fetchCurrentWeather = async (city: City) => {
  try {
    const cityKey = city.Key;
    const res = await axios.get(`${SERVER_URL}/weather/current/${cityKey}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const fetchHourlyForcasts = async (city: City) => {
  try {
    const cityKey = city.Key;
    const res = await axios.get(`${SERVER_URL}/weather/hourly/${cityKey}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export {
  fetchCity,
  fetcthDailyForecasts,
  fetchCurrentWeather,
  fetchHourlyForcasts,
};

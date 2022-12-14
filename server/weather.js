require("dotenv").config();
const express = require("express");
const router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const API_KEY = process.env.WEATHER_API_KEY;

const fetchCity = async (coordinates) => {
  const url = `${process.env.API_BASE_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${coordinates}&details=true`;
  try {
    const weatherStream = await fetch(url);
    const weatherJson = await weatherStream.json();
    return weatherJson;
  } catch (err) {
    return { Error: err.stack };
  }
};

const fetchCurrentWeather = async (cityKey) => {
  const url = `${process.env.API_BASE_URL}/currentconditions/v1/${cityKey}?apikey=${API_KEY}&language=en-ca&metric=true&details=true`;
  try {
    const currentWeatherStream = await fetch(url);
    const currentWeatherJson = await currentWeatherStream.json();
    return currentWeatherJson;
  } catch (err) {
    return { Error: err.stack };
  }
};

const fetchHourlyWeather = async (cityKey) => {
  const url = `${process.env.API_BASE_URL}/forecasts/v1/hourly/12hour/${cityKey}?apikey=${API_KEY}&language=en-ca&metric=true&details=true`;
  try {
    const hourlyWeatherStream = await fetch(url);
    const hourlyWeatherJson = await hourlyWeatherStream.json();
    return hourlyWeatherJson;
  } catch (err) {
    return { Error: err.stack };
  }
};

const fetchDailyWeather = async (cityKey) => {
  const url = `${process.env.API_BASE_URL}/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&details=true&metric=true`;
  try {
    const dailyWeatherStream = await fetch(url);
    const dailyWeatherJson = await dailyWeatherStream.json();
    return dailyWeatherJson;
  } catch (err) {
    return { Error: err.stack };
  }
};

router.get("/", (req, res) => {
  res.json({ success: "Hi there!" });
});

router.get("/city/:coordinates", async (req, res) => {
  const coordinates = req.params.coordinates;
  const data = await fetchCity(coordinates);
  res.json(data);
});

router.get("/weather/current/:cityKey", async (req, res) => {
  const cityKey = req.params.cityKey;
  const data = await fetchCurrentWeather(cityKey);
  res.json(data);
});

router.get("/weather/hourly/:cityKey", async (req, res) => {
  const cityKey = req.params.cityKey;
  const data = await fetchHourlyWeather(cityKey);
  res.json(data);
});

router.get("/weather/daily/:cityKey", async (req, res) => {
  const cityKey = req.params.cityKey;
  const data = await fetchDailyWeather(cityKey);
  res.json(data);
});

module.exports = router;

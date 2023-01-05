import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCity,
  fetchCurrentWeather,
  fetchHourlyForcasts,
  fetcthDailyForecasts,
} from "../api/weather";
import type { City } from "../types/city";
import type { CurrentWeather } from "../types/weather/current";
import type { HourlyWeather } from "../types/weather/hourly";
import type { DailyWeather } from "../types/weather/daily";

interface Coordinates {
  lat: number;
  lng: number;
}

export const setWeather = createAsyncThunk(
  "weatherStatus",
  async (coordinates: Coordinates, { rejectWithValue }) => {
    try {
      const city = await fetchCity(coordinates);
      const daily = await fetcthDailyForecasts(city);
      const current = await fetchCurrentWeather(city);
      const hourly = await fetchHourlyForcasts(city);
      // detect non technical error (still status)
      // e.g. use selected invalid coordinates
      const weathers = [city, daily, current, hourly];
      let noError = true;
      if (city.Error || daily.Error || current.Error || hourly.Error) {
        noError = false;
        // sorted as "reject"
        return rejectWithValue(weathers);
      }
      if (noError) {
        // sorted as "success"
        return {
          city: city,
          current: current[0],
          hourly: hourly,
          daily: daily,
        };
      }
    } catch (error) {
      throw error;
    }
  }
);

interface Weather {
  city: City | null;
  current: CurrentWeather | null;
  hourly: HourlyWeather[] | null;
  daily: DailyWeather | null;
  status: "PENDING" | "REJECTED" | "SUCCESS" | null;
  errorMessage: any;
}

const initialState: Weather = {
  city: null,
  current: null,
  hourly: null,
  daily: null,
  status: null,
  errorMessage: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearAllWeather(state) {
      state.city = null;
      state.current = null;
      state.hourly = null;
      state.daily = null;
      state.status = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setWeather.pending, (state) => {
      state.status = "PENDING";
    }),
      builder.addCase(setWeather.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.status = "REJECTED";
      }),
      builder.addCase(setWeather.fulfilled, (state, action) => {
        state.city = action.payload?.city;
        state.current = action.payload?.current;
        state.hourly = action.payload?.hourly;
        state.daily = action.payload?.daily;
        state.status = "SUCCESS";
        state.errorMessage = null;
        console.log("action payload", action.payload);
      });
  },
});

export const { clearAllWeather } = weatherSlice.actions;
export default weatherSlice.reducer;

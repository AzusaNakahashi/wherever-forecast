import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCity,
  fetchCurrentWeather,
  fetchHourlyForcasts,
  fetcthDailyForecasts,
} from "../api/weather";

export const setWeather = createAsyncThunk(
  "weatherStatus",
  async (coordinates, { rejectWithValue }) => {
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

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: null,
    current: null,
    hourly: null,
    daily: null,
    status: null,
    errorMessage: null,
  },
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
  extraReducers: {
    [setWeather.pending]: (state) => {
      state.status = "pending";
    },
    [setWeather.rejected]: (state, error) => {
      state.errorMessage = error;
      console.log("error", error);
      state.status = "rejected";
    },
    [setWeather.fulfilled]: (state, action) => {
      state.city = action.payload.city;
      state.current = action.payload.current;
      state.hourly = action.payload.hourly;
      state.daily = action.payload.daily;
      state.status = "success";
      state.errorMessage = null;
      console.log("action payload", action.payload);
    },
  },
});

export const { clearAllWeather } = weatherSlice.actions;
export default weatherSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCurrentLocation, fetchGoogleMap } from "../api/map";
import type { Map } from "../types/mapType";

export const setCurrentLocationCoordinates = createAsyncThunk(
  "coordinates/fetchByCurretLocation",
  async () => {
    try {
      const res = await fetchCurrentLocation();
      return res;
    } catch (error) {
      throw error;
    }
  }
);

export const setGooglegMap = createAsyncThunk(
  "map/fetchGoogleMap",
  async (ref: HTMLDivElement) => {
    try {
      const map = await fetchGoogleMap(ref);
      return map;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: Map = {
  map: null,
  mapOptions: {
    coordinates: { mapCenter: null, marker: null },
    zoom: 13,
    mapVerified: null,
  },
  loadingStatus: { currentLocationCoordinates: null, map: null },
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCoordinates(state, action) {
      console.log("set coordinates");
      state.mapOptions.coordinates.marker = action.payload;
    },
    setZoom(state, action) {
      console.log("zoom!!!");
      state.mapOptions.zoom = action.payload;
    },
    clearMap(state) {
      state.map = null;
    },
    watchMapAuth(state) {
      state.loadingStatus.map = "REJECTED";
    },
    setCenter(state, action) {
      state.mapOptions.coordinates.mapCenter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCurrentLocationCoordinates.pending, (state) => {
      state.loadingStatus.currentLocationCoordinates = "PENDING";
    }),
      builder.addCase(
        setCurrentLocationCoordinates.rejected,
        (state, action) => {
          state.loadingStatus.currentLocationCoordinates = "REJECTED";
        }
      ),
      builder.addCase(
        setCurrentLocationCoordinates.fulfilled,
        (state, action) => {
          const data = (action.payload as GeolocationPosition).coords;
          const coordinates = { lat: data.latitude, lng: data.longitude };
          state.mapOptions.coordinates.marker = coordinates;
          state.loadingStatus.currentLocationCoordinates = "SUCCESS";
        }
      ),
      builder.addCase(setGooglegMap.pending, (state) => {
        state.loadingStatus.map = "PENDING";
      }),
      builder.addCase(setGooglegMap.rejected, (state) => {
        state.loadingStatus.map = "REJECTED";
      }),
      builder.addCase(setGooglegMap.fulfilled, (state, action) => {
        state.map = action.payload;
        state.loadingStatus.map = "SUCCESS";
      });
  },
});

export const { setCoordinates, setZoom, clearMap, watchMapAuth, setCenter } =
  mapSlice.actions;
export default mapSlice.reducer;

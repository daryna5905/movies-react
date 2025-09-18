import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../types";

interface WatchlistState {
  items: Movie[];
}

const initialState: WatchlistState = { items: [] };

const slice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Movie>) => {
      const exists = state.items.find((m) => m.id === action.payload.id);
      if (!exists) state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((m) => m.id !== action.payload);
    },
  },
});

export const { add, remove } = slice.actions;
export default slice.reducer;

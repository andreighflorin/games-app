import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define types for the game's media and metadata
interface Game {
  id: string;
  gameText: string;
  provider: string;
  image: GameMedia;
}

interface GameMedia {
  alt: string;
  original: { src: string };
  small: { src: string };
  thumbnail: { src: string };
}

interface GamesState {
  games: Game[];
  status: "idle" | "loading" | "failed";
}

const initialState: GamesState = {
  games: [],
  status: "idle",
};

// Fetch games action
export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async (getPageLink: string) => {
    const response = await fetch(getPageLink);

    // Check if the response is okay
    if (!response.ok) {
      console.error("Error fetching games: ", response.statusText);
      throw new Error(
        `Failed to fetch games: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const games = data.components[0].games || []; // Ensure that you handle cases where items might not be present

    return games;
  }
);

// Create games slice
const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGames.fulfilled, (state, action: PayloadAction<Game[]>) => {
        state.status = "idle";
        state.games = action.payload; // Set the fetched games
      })
      .addCase(fetchGames.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default gamesSlice.reducer;

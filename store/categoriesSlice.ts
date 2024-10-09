import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(
      "https://casino.api.pikakasino.com/v1/pika/en/config/"
    );
    return response.data.lobby.menuCategories;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { categories: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.status = "succeeded";
    });
  },
});

export default categoriesSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL="https://connections-api.herokuapp.com"

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (token, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/transactions`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async ({ token, transaction }, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transaction),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

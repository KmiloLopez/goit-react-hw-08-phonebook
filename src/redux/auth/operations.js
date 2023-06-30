import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL="https://connections-api.herokuapp.com"

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      
      const response = await fetch(`${BASE_URL}/users/signup`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
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

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
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


export const logout = createAsyncThunk(
  "auth/logout",
  async (token, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
  );
   export const refreshUser = createAsyncThunk(
    "auth/refreshUser",
    async (token, thunkAPI) => {
      try {
        const response = await fetch(`${BASE_URL}/users/current`, {
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
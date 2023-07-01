import { createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL="https://connections-api.herokuapp.com"

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (token, thunkAPI) => {
    try {
      console.log("AsyncThunk > token",token)
      const response = await fetch(`${BASE_URL}/contacts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("desde throw new error",data.message);
      }

      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ token, userInfo }, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userInfo),
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
export const deleteContact = createAsyncThunk(
  'contacts/deletecontact',
  async (idToDelete, thunkAPI) => {
    try {
      const data = await fetch(`${BASE_URL}/contacts/${idToDelete}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToDelete.token}`,
        },
        body: JSON.stringify(idToDelete),
      });
      const response = await data.json();
      return response;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);
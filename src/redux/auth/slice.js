import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser, register } from "./operations";

const initialState = {
  user: { firstName: null, lastName: null, email: null },
  token: null,
  isLoading: false,
  isLoggedIn: false,
  error: null,
  formError: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFormError(state, { payload }) {
      state.formError = payload;
    },
    clearFormError(state) {
      state.formError = null;
    },
    clearError(state) {
      state.error = null;
    },
    userLogout(state) {
      state.user = { firstName: null, lastName: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [register.pending]: handlePending,
    [login.pending]: handlePending,
    [refreshUser.pending]: handlePending,
    [register.rejected]: handleRejected,
    [login.rejected]: handleRejected,
    [refreshUser.rejected]: handleRejected,
    [register.fulfilled](state, { payload }) {
      const { name, email } = payload.user;
      state.user = { name, email };
      state.token = payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
    },
    [login.fulfilled](state, { payload }) {
      console.log('login.Fulfilled');
      const { name, email } = payload.user;
      state.user = { name, email };
      state.token = payload.token;
      state.isLoggedIn = true;
      state.error = null;
      state.isLoading = false;
    },
    [refreshUser.fulfilled](state, { payload }) {
      state.user = {
        name: payload.firstName,
        email: payload.email,
      };
      state.isLoggedIn = true;
      state.error = null;
      state.isLoading = false;
    },
    [logout.fulfilled](state, { payload }) {
      state.user = {
        name: null,
        email: null,
      };
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const authReducer = authSlice.reducer;

export const { setFormError, clearFormError, clearError, userLogout } =
  authSlice.actions;

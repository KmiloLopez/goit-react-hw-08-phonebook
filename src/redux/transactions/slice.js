import { createSlice } from "@reduxjs/toolkit";
import { createTransaction, fetchTransactions } from "./operations";

const initialState = {
  items: [],
  meta: null,
  isLoading: false,
  error: null,
  formError: null,
  message: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const transactionsSlice = createSlice({
  name: "transactions",
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
    clearMessage(state) {
      state.message = null;
    },
  },
  extraReducers: {
    [fetchTransactions.pending]: handlePending,
    [createTransaction.pending]: handlePending,
    [fetchTransactions.rejected]: handleRejected,
    [createTransaction.rejected]: handleRejected,
    [fetchTransactions.fulfilled](state, { payload }) {
      state.items = payload.data;
      state.meta = payload.meta;
      state.isLoading = false;
      state.error = null;
      state.formError = undefined;
    },
    [createTransaction.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.error = null;
      state.formError = undefined;
      state.message = `A transaction of category ${payload.category} was created successfully`;
    },
  },
});

export const { setFormError, clearFormError, clearError, clearMessage } =
  transactionsSlice.actions;

export const transactionsReducer = transactionsSlice.reducer;

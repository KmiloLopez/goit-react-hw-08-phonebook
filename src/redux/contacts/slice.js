import { createSlice } from "@reduxjs/toolkit";
import { createTransaction, fetchContacts} from "./operations";
import { refreshUser } from "redux/auth/operations";

const initialState = {
  contacts: [{id:1, name:"jhon", phone:32165498789},{id:2, name:"LAU", phone:1813551685}],
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

export const contactsSlice = createSlice({
  name: "contacts",
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
    [fetchContacts.pending]: handlePending,
    [createTransaction.pending]: handlePending,
    [refreshUser.pending]: handlePending,
    [fetchContacts.rejected]: handleRejected,
    [createTransaction.rejected]: handleRejected,
    [refreshUser.rejected]: handleRejected,
    [fetchContacts.fulfilled](state, { payload }) {
      console.log('fectchContacts.Fulfilled',payload);
      state.contacts = payload.data;
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
    [refreshUser.fulfilled](state, { payload }) {
      state.user = {
        name: payload.name,
        email: payload.email,
      };
      state.isLoggedIn = true;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const { setFormError, clearFormError, clearError, clearMessage } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;

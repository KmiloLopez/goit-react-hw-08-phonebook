import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts} from "./operations";
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
    [addContact.pending]: handlePending,
    [refreshUser.pending]: handlePending,
    [deleteContact.pending]: handlePending,
    [fetchContacts.rejected]: handleRejected,
    [addContact.rejected]: handleRejected,
    [refreshUser.rejected]: handleRejected,
    [deleteContact.rejected]: handleRejected,
    [fetchContacts.fulfilled](state, { payload }) {
      console.log('fectchContacts.Fulfilled',payload);
      state.contacts = payload;
      state.meta = payload.meta;
      state.isLoading = false;
      state.error = null;
      state.formError = undefined;
    },
    [addContact.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.error = null;
      state.formError = undefined;
      state.message = `A transaction of category ${payload.category} was created successfully`;
      console.log("addContact.fulfilled");
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
    [deleteContact.fulfilled](state, { payload }) {//creo que no deberia aber nada de info en payload
      state.isLoading = false;
      state.error = null;
      state.formError = undefined;
      state.message = `deleted`;
      const index = state.contacts.findIndex(//borra de la lista que vemos en ui pero no en servidor. contacto regresa al refrescar la pg
        contact => contact.id === payload.id
      );
      state.contacts.splice(index, 1);
      console.log("deletedContact.fulfilled");
    },
  },
});

export const { setFormError, clearFormError, clearError, clearMessage } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;

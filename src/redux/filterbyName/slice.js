import { createSlice} from "@reduxjs/toolkit";

const filterInitialState = {
  filter:"",
} 
  
  const filterSlice = createSlice({
    name: "filter",
    initialState: filterInitialState,
    reducers: {
        filterByName(state, { payload }) {
        state.filter = payload
       
      },
      
    },
  });
  
  export const {filterByName} = filterSlice.actions;
  export const filterReducer = filterSlice.reducer;
  
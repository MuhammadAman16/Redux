import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const bugSlice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    //ACTIONS => ACTION HANDLERS
    bugAdded: (state, action) => {
      state.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugRemoved: (state, action) => {
      return state.filter((bug) => bug.id !== action.payload.id);
    },
    bugResolved: (state, action) => {
      const index = state.findIndex((bug) => bug.id === action.payload.id);
      if (index !== -1) {
        state[index].resolved = true;
      }
    },
  },
});

export const { bugAdded, bugRemoved, bugResolved } = bugSlice.actions;
export default bugSlice.reducer;

export const unresolvedBugSelector = (state) =>
  state.entities.bugs.filter((bug) => bug.resolved);

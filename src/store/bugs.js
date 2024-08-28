import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

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
    bugAssignedtoUser: (bugs, action) => {
      const { userId, bugId } = action.payload;
      const index = bugs.findIndex((bug) => bug.id === bugId);
      bugs[index].userId = userId;
    },
  },
});

export const { bugAdded, bugRemoved, bugResolved, bugAssignedtoUser } =
  bugSlice.actions;
export default bugSlice.reducer;

// export const unresolvedBugSelector = (state) =>
//   state.entities.bugs.filter((bug) => !bug.resolved);

export const unresolvedBugSelector = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const bugsByUserSelector = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId == userId)
  );
